const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'icon-preview.svg');
const svgContent = fs.readFileSync(svgPath);

// iOS requires these specific sizes
const sizes = [
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 167, name: 'apple-touch-icon-167x167.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 120, name: 'apple-touch-icon-120x120.png' },
  { size: 180, name: 'apple-touch-icon.png' } // Default
];

console.log('🎨 Generating iOS app icons from your design...\n');

Promise.all(
  sizes.map(({ size, name }) =>
    sharp(svgContent)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(path.join(__dirname, 'public', name))
      .then(() => console.log(`✅ Created ${name} (${size}x${size})`))
  )
)
  .then(() => console.log('\n🚀 All icons generated successfully!'))
  .catch(err => console.error('❌ Error:', err.message));
