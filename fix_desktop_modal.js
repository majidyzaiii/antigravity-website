const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldCssRegex = /\/\*\s*4\.\s*PC \/ DESKTOP VIEW[^\n]*\n@media\s*\(min-width:\s*769px\)\s*\{\s*html:root body \.mobile-nav-overlay\s*\{[\s\S]*?opacity:\s*1\s*!important;\s*\}\s*\}/g;

const newCss = `/* 4. PC / DESKTOP VIEW (>= 768px): Hide mobile menu entirely */
@media (min-width: 769px) {
    html:root body .mobile-nav-overlay {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -999 !important;
    }
}`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if(oldCssRegex.test(content)) {
        content = content.replace(oldCssRegex, newCss);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed desktop mobile modal in ' + file);
    }
}
