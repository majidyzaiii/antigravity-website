const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Change green line to white line
    content = content.replace(/border-bottom: 2px solid #34d399;/g, 'border-bottom: 2px solid #ffffff;');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed line color in ' + file);
}
