const fs = require('fs');
const files = ['about.html', 'contact.html', 'donation.html', 'admissions.html', 'updates.html', 'index.html'];

const styleToInject = `
<!-- UNIVERSAL INJECTED CSS FIXES -->
<style>
/* 1. Remove footer white lines */
.footer-section h3::after {
    display: none !important;
}
.footer-section h3 {
    padding-bottom: 0 !important;
}

/* 2. Fix footer heading size */
.footer-section h3 {
    font-size: 15px !important;
}

/* 3. Sticky header slide and green background fix for mobile */
@media (max-width: 768px) {
    body { padding-top: 0 !important; }
    #ultimateScrollHeader:not(.is-sticky) {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateY(-100%) !important;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out !important;
    }
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
`;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    if (!html.includes('<!-- UNIVERSAL INJECTED CSS FIXES -->')) {
        // Just append to the very end of the file
        html += '\n' + styleToInject + '\n';
        fs.writeFileSync(file, html, 'utf8');
        console.log('Appended universal fixes to ' + file);
    }
});
