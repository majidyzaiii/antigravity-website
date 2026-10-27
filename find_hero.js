const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('class="hero-content"')) {
        for(let j=Math.max(0, i-5); j<=i+30; j++) console.log('Line ' + j + ': ' + lines[j].trim());
        break;
    }
}
