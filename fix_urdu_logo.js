const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the transform with just a larger height
    content = content.replace(/transform: scale\(1\.5\) !important;/g, '');
    content = content.replace(/transform-origin: center !important;/g, '');
    
    // Also let's change the 80px height to 110px
    // The exact block is:
    // height: 80px !important;
    // max-height: 85px !important;
    content = content.replace(/height: 80px !important;/g, 'height: 110px !important;');
    content = content.replace(/max-height: 85px !important;/g, 'max-height: 120px !important;');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed urdu logo in ' + file);
}
