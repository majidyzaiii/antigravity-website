const fs = require('fs');
const files = ['about.html', 'contact.html', 'donation.html', 'admissions.html', 'updates.html'];

const styleBlock = `
<!-- FIX FOR SCROLLING STICKY HEADER v4 -->
<style id="sticky-header-scroll-fix">
@media (max-width: 768px) {
    /* Remove padding so minimal header sits at the top */
    body {
        padding-top: 0 !important;
    }
    
    /* Hide the main header at scroll 0 */
    #ultimateScrollHeader:not(.is-sticky) {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateY(-100%) !important;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out !important;
    }
    
    /* When scrolled, use ID for highest specificity to override the transparent bug! */
    #ultimateScrollHeader.is-sticky {
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
        background: linear-gradient(135deg, #004d3e, #007a62) !important;
        background-color: #006754 !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
        z-index: 99999 !important;
    }
}
</style>
</head>`;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Remove previous fix
    if (html.includes('id="sticky-header-scroll-fix"')) {
        const regex = /<!-- FIX FOR SCROLLING STICKY HEADER[^\n]*-->\s*<style id="sticky-header-scroll-fix">[\s\S]*?<\/style>\s*<\/head>/;
        html = html.replace(regex, '</head>');
    }
    
    // Inject before </head>
    html = html.replace('</head>', styleBlock);
    
    fs.writeFileSync(file, html, 'utf8');
    console.log('Injected v4 sticky fix into ' + file);
});
