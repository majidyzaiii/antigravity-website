const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Decrease .footer-bottom spacing
    content = content.replace(
        /margin-top: 30px;\s*padding-top: 20px;/g,
        'margin-top: 15px;\n            padding-top: 15px;'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed footer-bottom spacing in ' + file);
}
