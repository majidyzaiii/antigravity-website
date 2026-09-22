const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace flex-start with center in footer-brand
    content = content.replace(/\.footer-brand\s*\{\s*display:\s*flex\s*!important;\s*flex-direction:\s*column\s*!important;\s*align-items:\s*flex-start\s*!important;/g, '.footer-brand {\n            display: flex !important;\n            flex-direction: column !important;\n            align-items: center !important;');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed footer brand alignment in ' + file);
}
