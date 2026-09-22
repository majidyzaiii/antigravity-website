const fs = require('fs');
const files = ['about.html', 'contact.html', 'donation.html', 'admissions.html', 'updates.html'];

const styleBlock = `
<!-- FIX FOR SCROLLING STICKY HEADER v3 -->
<style id="sticky-header-scroll-fix">
@media (max-width: 768px) {
    /* Remove padding so minimal header sits at the top */
    body {
        padding-top: 0 !important;
    }
    
    /* Hide the main header at scroll 0, but keep it in DOM so it can transition */
    html body .scroll-home-header {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateY(-100%) !important;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out !important;
    }
    
    /* When scrolled, the main header gets .is-sticky and slides in */
    html body .scroll-home-header.is-sticky {
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
    
    // Remove previous fix (v1 or v2)
    if (html.includes('id="sticky-header-scroll-fix"')) {
        const regex = /<!-- FIX FOR SCROLLING STICKY HEADER[^\n]*-->\s*<style id="sticky-header-scroll-fix">[\s\S]*?<\/style>\s*<\/head>/;
        html = html.replace(regex, '</head>');
    }
    
    // Inject before </head>
    html = html.replace('</head>', styleBlock);
    
    fs.writeFileSync(file, html, 'utf8');
    console.log('Injected v3 sticky fix into ' + file);
});
