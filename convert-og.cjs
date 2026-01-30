const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'og-image.svg');
const pngPath = path.join(__dirname, 'public', 'og-image.png');

const svgContent = fs.readFileSync(svgPath);

sharp(svgContent)
    .resize(1200, 630)
    .png()
    .toFile(pngPath)
    .then(() => {
        console.log('✅ Successfully converted og-image.svg to og-image.png');
    })
    .catch(err => {
        console.error('❌ Failed to convert:', err.message);
    });
