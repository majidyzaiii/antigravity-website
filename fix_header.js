const fs = require('fs');
['contact.html', 'donation.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace('<body class="hide-main-header"', '<body');
    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed ' + file);
});
