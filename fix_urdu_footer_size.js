const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldCssRegex = /height: auto !important;\s*max-height: 75px !important;\s*width: auto !important;\s*max-width: 90% !important;\s*margin: 5px auto 15px auto !important;\s*object-fit: contain !important;\s*display: block !important;/g;

const newCss = `height: auto !important;
            max-height: 75px !important;
            width: auto !important;
            max-width: 90% !important;
            margin: -5px auto 0 auto !important;
            object-fit: contain !important;
            display: block !important;
            transform: scale(1.45) !important;`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if(oldCssRegex.test(content)) {
        content = content.replace(oldCssRegex, newCss);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed Urdu footer size in ' + file);
    }
}
