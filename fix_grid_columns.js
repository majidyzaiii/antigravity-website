const fs = require('fs');
let html = fs.readFileSync('updates.html', 'utf8');

const regexOldGrid = /grid-template-columns:\s*repeat\(auto-fill,\s*minmax\(300px,\s*1fr\)\)\s*!important;/g;
html = html.replace(regexOldGrid, 'grid-template-columns: repeat(3, 1fr) !important;');

fs.writeFileSync('updates.html', html, 'utf8');
console.log('Fixed grid to strictly 3 columns');
