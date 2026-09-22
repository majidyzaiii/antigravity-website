const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const styleToInject = `
<!-- FIX TO REMOVE FOOTER LINES -->
<style>
.footer-section h3::after {
    display: none !important;
}
.footer-section h3 {
    padding-bottom: 0 !important;
}
</style>
</head>`;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Inject before </head> if not already injected
    if (!html.includes('<!-- FIX TO REMOVE FOOTER LINES -->')) {
        html = html.replace('</head>', styleToInject);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Removed footer lines from ' + file);
    } else {
        console.log('Already fixed: ' + file);
    }
});
