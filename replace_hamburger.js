const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldSvgRegex = /<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">\s*<line x1="3" y1="12" x2="21" y2="12"><\/line>\s*<line x1="3" y1="6" x2="21" y2="6"><\/line>\s*<line x1="3" y1="18" x2="21" y2="18"><\/line>\s*<\/svg>/g;

const newSvg = `<svg class="fries-menu-icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6h16 M10 12h10 M4 18h16"></path>
            </svg>`;

const cssToInject = `
<style id="fries-menu-css">
html[dir="rtl"] .fries-menu-icon {
    transform: scaleX(-1);
}
.fries-menu-icon path {
    transition: all 0.3s ease;
}
.mobile-menu-btn:hover .fries-menu-icon path:nth-child(1) {
    d: path("M4 6h16 M6 12h14 M4 18h16");
}
</style>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace SVG
    if (content.match(oldSvgRegex)) {
        content = content.replace(oldSvgRegex, newSvg);
    }
    
    // Inject CSS
    if (!content.includes('id="fries-menu-css"')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', cssToInject + '\n</head>');
        }
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Replaced hamburger in ' + file);
}
