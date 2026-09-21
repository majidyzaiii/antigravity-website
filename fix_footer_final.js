const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const goodCSS = `
<style id="footer-h3-fix">
.footer-section h3 {
    position: relative !important;
    padding-bottom: 8px !important;
    margin-bottom: 12px !important;
    border-bottom: none !important;
    display: inline-block !important;
    width: max-content !important;
    align-self: center !important;
}
.footer-section h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    border-radius: 2px;
}
</style>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Remove the bad 100% width rule
    content = content.replace(/\.footer-section h3 \{\s*text-align: center !important;\s*width: 100% !important;\s*\}/g, '.footer-section h3 {\ntext-align: center !important;\n}');
    
    // 2. Inject the good CSS if not present
    if (!content.includes('width: max-content !important;')) {
        // Fallback for admissions.html or others
        if (content.includes('<footer class="site-footer">')) {
            content = content.replace('<footer class="site-footer">', goodCSS + '\n<footer class="site-footer">');
            console.log('Injected good CSS before footer in ' + file);
        }
    } else {
        console.log('Good CSS already exists in ' + file);
    }
    
    fs.writeFileSync(file, content, 'utf8');
}
