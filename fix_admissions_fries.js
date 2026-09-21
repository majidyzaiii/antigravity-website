const fs = require('fs');
let content = fs.readFileSync('admissions.html', 'utf8');
const cssToInject = `
<style id="fries-menu-css">
html[dir="rtl"] .fries-menu-icon {
    transform: scaleX(-1);
}
.fries-menu-icon path {
    transition: all 0.3s ease;
}
</style>
`;
if (!content.includes('id="fries-menu-css"')) {
    content = content.replace('<footer class="site-footer">', cssToInject + '\n<footer class="site-footer">');
    fs.writeFileSync('admissions.html', content, 'utf8');
    console.log('Fixed admissions.html');
}
