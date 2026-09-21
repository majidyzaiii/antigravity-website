const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const cssToInject = `
<!-- FOOTER GRID OVERLAY -->
<style id="footer-grid-overlay">
.site-footer {
    position: relative !important;
    overflow: hidden !important;
}
.site-footer::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    z-index: 1;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 45px 45px;
    transform: perspective(1000px) rotateX(15deg) rotateZ(10deg) scale(1.1);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
}
.footer-content {
    position: relative;
    z-index: 2; /* Ensures content stays above the grid */
}
</style>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove if already injected
    content = content.replace(/<!-- FOOTER GRID OVERLAY -->\s*<style id="footer-grid-overlay">[\s\S]*?<\/style>/, '');
    
    // Inject right before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', cssToInject + '\n</head>');
    } else {
        // Fallback: before the footer itself
        content = content.replace('<footer class="site-footer">', cssToInject + '\n<footer class="site-footer">');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Added footer grid to ' + file);
}
