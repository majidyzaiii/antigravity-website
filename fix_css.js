const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add min-width, min-height, and box-sizing to .capsule-icon-badge
    content = content.replace(
        /height: 36px !important;\s*border-radius: 50% !important;/g,
        'height: 36px !important;\n        min-width: 36px !important;\n        min-height: 36px !important;\n        border-radius: 50% !important;\n        box-sizing: border-box !important;'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed CSS in ' + file);
}
