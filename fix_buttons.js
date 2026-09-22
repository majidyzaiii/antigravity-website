const fs = require('fs');
const files = ['about.html', 'contact.html', 'donation.html', 'admissions.html', 'updates.html'];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Remove back button
    html = html.replace(/<button[^>]*class="minimal-back-btn"[\s\S]*?<\/button>/g, '');
    html = html.replace(/<button[^>]*onclick="history\.back\(\)"[\s\S]*?<\/button>/g, '');
    
    // Remove hamburger button inside about-minimal-header
    html = html.replace(/<button[^>]*class="minimal-hamburger-btn"[\s\S]*?<\/button>/g, '');
    
    fs.writeFileSync(file, html, 'utf8');
    console.log('Cleaned up minimal header buttons in ' + file);
});
