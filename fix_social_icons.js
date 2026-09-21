const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Decrease .social-btn size
    content = content.replace(
        /\.social-btn {\s*width: 38px;\s*height: 38px;/g,
        '.social-btn {\n            width: 32px;\n            height: 32px;'
    );
    
    // 2. Decrease SVG size inside footer-social-links
    // Only target SVGs inside the footer, not everywhere (since I might hit the header by mistake)
    // Actually, in the HTML, they are written exactly as: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    // Since there are exactly 4 of these in the footer, let's just replace them all if they match this string.
    content = content.replace(
        /<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">/g,
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed social icons spacing in ' + file);
}
