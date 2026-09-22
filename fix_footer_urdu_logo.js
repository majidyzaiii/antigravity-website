const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the height: 110px block
    const oldBlockRegex = /height: 110px !important;\s*max-height: 120px !important;\s*width: auto !important;\s*margin: -18px auto 15px auto !important;\s*object-fit: contain !important;\s*display: block !important;/g;
    
    const newBlock = `height: auto !important;
            max-height: 75px !important;
            width: auto !important;
            max-width: 90% !important;
            margin: 5px auto 15px auto !important;
            object-fit: contain !important;
            display: block !important;`;
            
    content = content.replace(oldBlockRegex, newBlock);
    
    // Fallback if regex fails (e.g., due to spacing)
    content = content.replace(/height: 110px !important;/g, 'height: auto !important;');
    content = content.replace(/max-height: 120px !important;/g, 'max-height: 75px !important;');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed urdu footer logo size in ' + file);
}
