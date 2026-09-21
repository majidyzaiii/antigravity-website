const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        /padding: 12px 20px !important;\s*text-decoration: none !important;/g,
        'padding: 12px 20px !important;\n        box-sizing: border-box !important;\n        text-decoration: none !important;'
    );
    
    fs.writeFileSync(file, content, 'utf8');
}
