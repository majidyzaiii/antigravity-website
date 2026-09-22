const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldCss = `height: auto !important;
        max-height: auto !important;
        min-height: auto !important;`;

const newCss = `height: 80px !important;
        max-height: 80px !important;
        min-height: 80px !important;`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the corrupted CSS block
    if(content.includes('max-height: auto !important;')) {
        content = content.replace(oldCss, newCss);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed header logo size in ' + file);
    }
}
