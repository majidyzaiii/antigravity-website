const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. .site-footer padding
    content = content.replace(
        /padding: 70px 40px 20px;/g,
        'padding: 40px 20px 15px;'
    );
    
    // 2. .footer-content padding and gap
    content = content.replace(
        /padding: 40px 20px;/g,
        'padding: 0;'
    );
    content = content.replace(
        /gap: 40px;/g,
        'gap: 20px;'
    );
    
    // 3. .footer-section h3 margin
    content = content.replace(
        /margin-bottom: 25px;/g,
        'margin-bottom: 12px;'
    );
    
    // 4. .footer-section p, li margin and line height
    content = content.replace(
        /line-height: 1\.8;\s*margin-bottom: 12px;/g,
        'line-height: 1.5;\n            margin-bottom: 4px;'
    );
    
    // 5. .footer-logo max-width
    content = content.replace(
        /max-width: 160px;/g,
        'max-width: 110px;'
    );
    
    // 6. Mobile media queries overrides
    content = content.replace(
        /padding: 50px 20px 20px;/g,
        'padding: 30px 15px 15px;'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed footer spacing in ' + file);
}
