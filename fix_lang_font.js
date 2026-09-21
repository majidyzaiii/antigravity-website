const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the Outfit override for the language button in Urdu mode
    content = content.replace(
        /\/\* Ensure lang switch stays Outfit in Urdu mode if text is English \*\/\s*html\[dir=\"rtl\"\] \.capsule-lang-item \.capsule-text,\s*html\[lang=\"ur\"\] \.capsule-lang-item \.capsule-text \{\s*font-family: 'Outfit', sans-serif !important;\s*font-size: 16px !important;\s*\}/g,
        '/* Removed Outfit override since we use Urdu script for English now */'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
}
