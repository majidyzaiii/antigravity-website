const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Add viewBox to SVGs that don't have it (capsule icons)
    content = content.replace(/<svg><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z/g, '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z');
    content = content.replace(/<svg><circle cx="12" cy="12" r="10"><\/circle><line x1="12" y1="16" x2="12" y2="12">/g, '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12">');
    content = content.replace(/<svg><path d="M22 10v6M2 10l10-5 10 5-10 5z"><\/path><path d="M6 12v5c3 3 9 3 12 0v-5">/g, '<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5">');
    content = content.replace(/<svg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"><\/path><path d="M13.73 21a2 2 0 0 1-3.46 0">/g, '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0">');
    content = content.replace(/<svg><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">/g, '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">');
    content = content.replace(/<svg><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 \.7 2.81 2 2 0 0 1-\.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-\.45 12.84 12.84 0 0 0 2.81\.7A2 2 0 0 1 22 16.92z">/g, '<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">');
    content = content.replace(/<svg><circle cx="12" cy="12" r="10"><\/circle><line x1="2" y1="12" x2="22" y2="12"><\/line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">/g, '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">');

    // 2. Reduce padding in .capsule-item
    content = content.replace(
        /padding: 12px 20px !important;/g,
        'padding: 8px 16px !important;'
    );

    // 3. Reduce close button size
    content = content.replace(
        /width: 52px !important;\s*height: 52px !important;/g,
        'width: 44px !important;\n        height: 44px !important;'
    );
    
    // 4. Reduce close icon svg size
    content = content.replace(
        /<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2.5"/g,
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2.5"'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed SVG and sizes in ' + file);
}
