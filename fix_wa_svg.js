const fs = require('fs');
let html = fs.readFileSync('contact.html', 'utf8');

const regex = /<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">[\s\S]*?<\/svg>/;

const newSvg = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
</svg>`;

if(regex.test(html)) {
    html = html.replace(regex, newSvg);
    fs.writeFileSync('contact.html', html, 'utf8');
    console.log('Fixed SVG');
} else {
    console.log('Regex did not match');
}
