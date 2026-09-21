const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Remove the order hacks and margin hacks from Urdu mode
    content = content.replace(
        /margin-right: 0 !important;\s*margin-left: 14px !important;\s*order: 2 !important; \/\* Move icon to the right \*\//g,
        '/* Automatically handled by RTL flex direction */'
    );
    content = content.replace(
        /order: 1 !important;/g,
        ''
    );
    
    // 2. Remove margin-right: 14px from English mode
    content = content.replace(
        /margin-right: 14px !important;\s*margin-left: 0 !important;/g,
        '/* Removed margins, using gap instead */'
    );
    
    // 3. Add gap: 14px to .capsule-item
    content = content.replace(
        /display: flex !important;\s*align-items: center !important;\s*background: #ffffff !important;/g,
        'display: flex !important;\n        align-items: center !important;\n        gap: 14px !important;\n        background: #ffffff !important;'
    );
    
    // 4. Change English to انگریزی in the lang switch
    content = content.replace(
        /data-ur="English"/g,
        'data-ur="انگریزی"'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
}
