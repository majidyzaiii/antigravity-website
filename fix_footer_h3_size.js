const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const styleToInject = `
<!-- FIX FOOTER HEADING SIZE -->
<style>
.footer-section h3 {
    font-size: 15px !important;
}
</style>
</head>`;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Inject before </head> if not already injected
    if (!html.includes('<!-- FIX FOOTER HEADING SIZE -->')) {
        html = html.replace('</head>', styleToInject);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Fixed footer h3 size in ' + file);
    } else {
        console.log('Already fixed: ' + file);
    }
});
