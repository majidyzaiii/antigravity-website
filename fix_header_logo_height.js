const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    const oldCss = `height: auto !important;
        max-height: 80px !important; 
        min-height: 80px !important;`;

    const newCss = `height: 80px !important;
        max-height: 80px !important; 
        min-height: 80px !important;`;
    
    if(content.includes(oldCss)) {
        content = content.replace(oldCss, newCss);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed header logo height completely in ' + file);
    }
}
