const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, 'images');
const vehiclesFile = path.resolve(__dirname, 'src/vehicles.js');

function cleanName(fileName) {
    let name = fileName.replace(/\.[^/.]+$/, "");
    name = name.replace(/_1_front$/i, "");
    name = name.replace(/_2_side$/i, "");
    name = name.replace(/_Side-View$/i, "");
    name = name.replace(/_Top-View$/i, "");

    // Also strip generic endings that signify duplicate angles NOT variants
    // E.g. _1, _2 AT THE END usually means just another angle of same object
    // BUT we want to keep them as variants in the list.

    name = name.replace(/-/g, " ");
    name = name.replace(/_/g, " ");
    return name.trim();
}

function getFamilyName(name) {
    const n = name.toUpperCase();
    if (n.startsWith('FALCON 9')) return 'Falcon 9';
    if (n.startsWith('FALCON HEAVY')) return 'Falcon Heavy';
    if (n.startsWith('STARSHIP')) return 'Starship';
    if (n.startsWith('ATLAS V')) return 'Atlas V';
    if (n.startsWith('DELTA IV')) return 'Delta IV';
    if (n.startsWith('SLS')) return 'SLS';
    if (n.startsWith('ARIANE 6')) return 'Ariane 6';
    if (n.startsWith('LONG MARCH')) return 'Long March';
    if (n.startsWith('PROTON')) return 'Proton';
    if (n.startsWith('SOYUZ')) return 'Soyuz';
    if (n.startsWith('VULCAN')) return 'Vulcan';
    if (n.startsWith('NEW GLENN')) return 'New Glenn';
    if (n.startsWith('NEW SHEPARD')) return 'New Shepard';
    if (n.startsWith('ELECTRON')) return 'Electron';
    if (n.startsWith('RD-180')) return 'RD-180';
    if (n.startsWith('RD-170')) return 'RD-170';
    if (n.startsWith('RS-25')) return 'RS-25';
    if (n.startsWith('MERLIN')) return 'Merlin';
    if (n.startsWith('RAPTOR')) return 'Raptor';
    if (n.startsWith('DRAGON 2')) return 'Dragon 2';
    if (n.startsWith('DRAGON 1')) return 'Dragon 1';
    if (n.startsWith('CST-100')) return 'Starliner';

    return name; // No grouping
}

const vehicleSpecs = {
    // Rockets
    'Falcon 9': { height: '70 m', payloadLEO: '22,800 kg', description: 'Two-stage-to-orbit medium lift launch vehicle designed and manufactured by SpaceX.' },
    'Falcon Heavy': { height: '70 m', payloadLEO: '63,800 kg', description: 'Heavy-lift launch vehicle derived from the Falcon 9, consisting of a strengthened Falcon 9 first stage as a central core with two additional Falcon 9 first stages as strap-on boosters.' },
    'Starship': { height: '121 m', payloadLEO: '150,000+ kg', description: 'Fully reusable super heavy-lift launch vehicle under development by SpaceX.' },
    'SLS': { height: '98 m', payloadLEO: '95,000 kg', description: 'American super heavy-lift expendable launch vehicle under development by NASA.' },
    'Atlas V': { height: '58.3 m', payloadLEO: '18,850 kg', description: 'Expendable launch vehicle formerly in the Atlas rocket family.' },
    'Delta IV': { height: '72 m', payloadLEO: '28,370 kg', description: 'Expendable launch vehicle, the largest of the Delta IV family.' },
    'Ariane 6': { height: '63 m', payloadLEO: '21,650 kg', description: 'European heavy-lift launch vehicle under development by ArianeGroup.' },
    'New Glenn': { height: '98 m', payloadLEO: '45,000 kg', description: 'Heavy-lift orbital launch vehicle under development by Blue Origin.' },
    'Electron': { height: '18 m', payloadLEO: '300 kg', description: 'Two-stage, partially recoverable orbital launch vehicle developed by Rocket Lab.' },
    'Vulcan': { height: '61.6 m', payloadLEO: '27,200 kg', description: 'Heavy-lift launch vehicle under development by ULA to replace Atlas V and Delta IV.' },
    'Proton': { height: '53 m', payloadLEO: '23,000 kg', description: 'Expended heavy-lift launch vehicle originally designed as an ICBM.' },
    'Soyuz': { height: '46 m', payloadLEO: '8,200 kg', description: 'Family of expendable launch systems designed by OKB-1.' },

    // Engines
    'Merlin': { thrust: '854 kN (SL)', isp: '311 s (Vac)', description: 'Rocket engine family developed by SpaceX for use on its Falcon 1, Falcon 9 and Falcon Heavy launch vehicles.' },
    'Raptor': { thrust: '2,300 kN (SL)', isp: '350 s (Vac)', description: 'Full-flow staged-combustion engine fueled by cryogenic liquid methane and liquid oxygen (methalox).' },
    'RS-25': { thrust: '1,860 kN (SL)', isp: '452 s (Vac)', description: 'Liquid-fuel cryogenic rocket engine used on the Space Shuttle and SLS.' },
    'BE-4': { thrust: '2,400 kN (SL)', isp: '340 s (Vac)', description: 'Oxygen-rich staged combustion cycle engine developed by Blue Origin.' },
    'RD-180': { thrust: '3,830 kN (SL)', isp: '338 s (Vac)', description: 'Russian liquid-propellant rocket engine used on the Atlas V.' },
    'RD-170': { thrust: '7,257 kN (SL)', isp: '337 s (Vac)', description: 'World\'s most powerful liquid-fuel rocket engine.' },
    'Rutherford': { thrust: '25 kN (SL)', isp: '343 s (Vac)', description: 'First electric-pump-fed engine to fly time to orbit.' },
    'RS-68': { thrust: '2,950 kN (SL)', isp: '410 s (Vac)', description: 'Liquid hydrogen/liquid oxygen booster engine for the Delta IV.' },
};

const vehicles = {
    rockets: {},
    engines: {},
    capsules: {}
};

const imports = [];
const seenImports = new Set();

function processFile(filePath, category, manufacturerFallback = 'Unknown') {
    const fileName = path.basename(filePath);
    if (!fileName.toLowerCase().endsWith('.png') && !fileName.toLowerCase().endsWith('.jpg')) return;
    if (filePath.includes('_Fairings') || filePath.includes('_Second Stages') || fileName.startsWith('.')) return;
    if (fileName.startsWith('_')) return;

    const clean = cleanName(fileName);
    const familyName = getFamilyName(clean);

    // Normalize ID
    const id = familyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const variantId = clean.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Import Handling
    const importName = `img_${variantId.replace(/-/g, '_')}`;
    if (!seenImports.has(importName)) {
        const relPath = path.relative(path.join(__dirname, 'src'), filePath);
        imports.push(`import ${importName} from '${relPath}';`);
        seenImports.add(importName);
    }

    // Manufacturer guessing
    let manufacturer = manufacturerFallback;
    const upper = clean.toUpperCase();
    if (upper.includes('SPACEX') || upper.includes('FALCON') || upper.includes('STARSHIP') || upper.includes('RAPTOR') || upper.includes('MERLIN') || upper.includes('DRAGON')) manufacturer = 'SpaceX';
    else if (upper.includes('BLUE ORIGIN') || upper.includes('NEW GLENN') || upper.includes('BE-4') || upper.includes('NEW SHEPARD')) manufacturer = 'Blue Origin';
    else if (upper.includes('NASA') || upper.includes('SATURN') || upper.includes('SLS') || upper.includes('SHUTTLE')) manufacturer = 'NASA';
    else if (upper.includes('ULA') || upper.includes('ATLAS') || upper.includes('DELTA') || upper.includes('VULCAN') || upper.includes('CENTAUR')) manufacturer = 'ULA';
    else if (upper.includes('ARIANE')) manufacturer = 'ArianeGroup';
    else if (upper.includes('ELECTRON') || upper.includes('NEUTRON') || upper.includes('RUTHERFORD')) manufacturer = 'Rocket Lab';
    else if (upper.includes('SOYUZ') || upper.includes('VOSKHOD') || upper.includes('PROTON') || upper.includes('ZENIT') || upper.includes('RD-')) manufacturer = 'Soviet/Russian State';
    else if (upper.includes('LONG MARCH')) manufacturer = 'CASC (China)';

    // Variant Object
    const variant = {
        name: clean,
        image: importName
    };

    if (!vehicles[category][id]) {
        const specs = vehicleSpecs[familyName] || {};

        vehicles[category][id] = {
            id: id,
            name: familyName,
            manufacturer: manufacturer,
            // Use specs description if available, otherwise heuristic or placeholder
            description: specs.description || `${familyName} family - ${category}`,
            image: importName, // Default to first image found
            variants: [],
            // Initialize stats with TBD or from specs
            ...(category === 'rockets' ? {
                height: specs.height || 'TBD',
                payloadLEO: specs.payloadLEO || 'TBD'
            } : category === 'engines' ? {
                thrust: specs.thrust || 'TBD',
                isp: specs.isp || 'TBD'
            } : {
                crew: specs.crew || 'N/A'
            })
        };
    }

    // Add to variants
    // Check if variant already exists to prevent duplicates
    const exists = vehicles[category][id].variants.find(v => v.name === clean);
    if (!exists) {
        vehicles[category][id].variants.push(variant);
    }
}

function traverse(dir, category, manufacturer) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            let manuf = manufacturer;
            if (file === 'American Rocket Engines') manuf = 'USA';
            if (file === 'Soviet Rocket Engines') manuf = 'Soviet/Russia';
            if (file === 'European Rocket Engines') manuf = 'ESA';
            traverse(fullPath, category, manuf);
        } else {
            processFile(fullPath, category, manufacturer);
        }
    });
}

// 1. Rockets
if (fs.existsSync(path.join(rootDir, 'Rockets'))) {
    traverse(path.join(rootDir, 'Rockets'), 'rockets', 'Various');
}
// 2. Engines
if (fs.existsSync(path.join(rootDir, 'Rocket Engines'))) {
    traverse(path.join(rootDir, 'Rocket Engines'), 'engines', 'Various');
}
// 3. Capsules
if (fs.existsSync(path.join(rootDir, 'Capsules and space vehicles'))) {
    traverse(path.join(rootDir, 'Capsules and space vehicles'), 'capsules', 'Various');
}

// Convert Map to Array
const rocketsArr = Object.values(vehicles.rockets);
const enginesArr = Object.values(vehicles.engines);
const capsulesArr = Object.values(vehicles.capsules);

let content = `// Auto-generated vehicle library
${imports.join('\n')}

export const rockets = ${JSON.stringify(rocketsArr, null, 2).replace(/"image": "([^"]+)"/g, '"image": $1')};

export const engines = ${JSON.stringify(enginesArr, null, 2).replace(/"image": "([^"]+)"/g, '"image": $1')};

export const capsules = ${JSON.stringify(capsulesArr, null, 2).replace(/"image": "([^"]+)"/g, '"image": $1')};
`;

console.log(content);
