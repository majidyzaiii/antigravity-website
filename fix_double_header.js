const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // 1. Remove inline style from body
    html = html.replace(/<body style="margin: 0 !important; padding: 0 !important;">/g, '<body>');
    
    // 2. Remove the about-minimal-header div completely
    // We need to use a regex that matches the div and everything inside it up to its closing tag.
    // It looks like it's a block. Let's find it.
    let startIdx = html.indexOf('<div class="about-minimal-header">');
    if (startIdx !== -1) {
        // Find the matching closing div. It contains buttons, SVGs, etc.
        // Easiest is to search for the next <main> or <section> or whatever comes after it.
        // Actually, let's just use a regex that is greedy up to </div>\s*<main
        // Or we can just count div tags.
        let endIdx = -1;
        let divCount = 0;
        let i = startIdx;
        let foundFirst = false;
        
        while (i < html.length) {
            if (html.substring(i, i+4) === '<div') {
                divCount++;
                foundFirst = true;
            } else if (html.substring(i, i+5) === '</div') {
                divCount--;
            }
            
            if (foundFirst && divCount === 0) {
                endIdx = i + 6; // include </div>
                break;
            }
            i++;
        }
        
        if (endIdx !== -1) {
            html = html.substring(0, startIdx) + html.substring(endIdx);
            console.log('Removed about-minimal-header from ' + file);
        }
    }
    
    fs.writeFileSync(file, html, 'utf8');
});
console.log('Done');
