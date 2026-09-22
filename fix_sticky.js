const fs = require('fs');
const files = ['about.html', 'contact.html', 'donation.html', 'admissions.html', 'updates.html'];

const styleBlock = `
<!-- FIX FOR SCROLLING STICKY HEADER -->
<style id="sticky-header-scroll-fix">
@media (max-width: 768px) {
    /* Remove padding so minimal header sits at the top */
    body {
        padding-top: 0 !important;
    }
    
    /* Hide the main header at scroll 0 */
    .scroll-home-header:not(.is-sticky) {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
    
    /* When scrolled, the main header gets .is-sticky and appears */
    .scroll-home-header.is-sticky {
        display: flex !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        animation: slideDown 0.3s ease-out forwards !important;
    }
    
    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }
}
</style>
</head>`;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Remove any previous versions of this fix if they exist
    if (html.includes('id="sticky-header-scroll-fix"')) {
        const regex = /<!-- FIX FOR SCROLLING STICKY HEADER -->\s*<style id="sticky-header-scroll-fix">[\s\S]*?<\/style>/;
        html = html.replace(regex, '');
    }
    
    // Inject before </head>
    html = html.replace('</head>', styleBlock);
    
    fs.writeFileSync(file, html, 'utf8');
    console.log('Injected sticky fix into ' + file);
});
