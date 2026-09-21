const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const cssToAdd = `
.footer-section h3 {
    display: inline-block;
    padding-bottom: 6px;
    border-bottom: 2px solid #34d399; /* beautiful emerald green line */
}
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Inject the CSS block right before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style>' + cssToAdd + '</style>\n</head>');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed footer heading in ' + file);
}
