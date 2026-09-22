const fs = require('fs');
const files = ['about.html', 'contact.html', 'donation.html', 'admissions.html', 'updates.html'];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // We only want to remove <div class="sticky-header"> that DOES NOT have an ID.
    // The good one has <div id="ultimateScrollHeader" class="sticky-header scroll-home-header">
    
    let startStr = '<div class="sticky-header">';
    let startIdx = html.indexOf(startStr);
    
    if (startIdx !== -1) {
        let divCount = 0;
        let endIdx = -1;
        let i = startIdx;
        let foundFirst = false;
        
        while(i < html.length) {
            if (html.substring(i, i+4) === '<div') {
                divCount++;
                foundFirst = true;
            } else if (html.substring(i, i+5) === '</div') {
                divCount--;
            }
            
            if (foundFirst && divCount === 0) {
                endIdx = i + 6;
                break;
            }
            i++;
        }
        
        if (endIdx !== -1) {
            html = html.substring(0, startIdx) + html.substring(endIdx);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Removed duplicate header from ' + file);
        }
    }
});
