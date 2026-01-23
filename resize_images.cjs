const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, 'images');

function resizeImages(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            resizeImages(filePath);
        } else if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg')) {
            try {
                console.log(`Resizing ${file}...`);
                // Resize to max dimension 800px to be safe but detailed enough
                execSync(`sips -Z 800 "${filePath}"`);
            } catch (e) {
                console.error(`Failed to resize ${file}:`, e.message);
            }
        }
    });
}

resizeImages(rootDir);
console.log('Finished resizing images.');
