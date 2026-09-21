const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const cssToReplace = `.capsule-icon-badge {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        background: #ecfdf5 !important;
        border: 1px solid #d1fae5 !important;
        color: #047857 !important;
        flex-shrink: 0 !important;
    }`;

const cssReplacement = `.capsule-icon-badge {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        min-height: 36px !important;
        border-radius: 50% !important;
        background: #ecfdf5 !important;
        border: 1px solid #d1fae5 !important;
        color: #047857 !important;
        flex-shrink: 0 !important;
        box-sizing: border-box !important;
    }
    .capsule-item { box-sizing: border-box !important; overflow: hidden !important; }`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix CSS
    content = content.replace(cssToReplace, cssReplacement);
    
    // Fix Urdu text by completely replacing the text strings, matching any data-ur
    content = content.replace(/data-en="HOME" data-ur="[^"]*"/g, 'data-en="HOME" data-ur="صفحۂ اول"');
    content = content.replace(/data-en="ABOUT US" data-ur="[^"]*"/g, 'data-en="ABOUT US" data-ur="ہمارے بارے میں"');
    content = content.replace(/data-en="ADMISSIONS" data-ur="[^"]*"/g, 'data-en="ADMISSIONS" data-ur="داخلہ"');
    content = content.replace(/data-en="UPDATES" data-ur="[^"]*"/g, 'data-en="UPDATES" data-ur="اعلانات"');
    content = content.replace(/data-en="DONATION" data-ur="[^"]*"/g, 'data-en="DONATION" data-ur="عطیات"');
    content = content.replace(/data-en="CONTACT US" data-ur="[^"]*"/g, 'data-en="CONTACT US" data-ur="رابطہ"');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
}
