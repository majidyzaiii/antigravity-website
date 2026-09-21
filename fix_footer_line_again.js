const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newCSS = `
.footer-section h3 {
    position: relative !important;
    padding-bottom: 8px !important;
    margin-bottom: 12px !important;
    border-bottom: none !important;
    display: inline-block !important;
    width: max-content !important;
    align-self: center !important;
}
.footer-section h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    border-radius: 2px;
}
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the old injected style if it exists
    content = content.replace(/\.footer-section h3 \{\s*display: inline-block;\s*padding-bottom: 6px;\s*border-bottom: 2px solid #ffffff;( \/\* beautiful emerald green line \*\/)?\s*\}/g, '');
    content = content.replace(/\.footer-section h3 \{\s*display: inline-block;\s*padding-bottom: 6px;\s*border-bottom: 2px solid #34d399;( \/\* beautiful emerald green line \*\/)?\s*\}/g, '');

    // Inject the new foolproof style before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style>' + newCSS + '</style>\n</head>');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed footer line in ' + file);
}
