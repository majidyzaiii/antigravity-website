const fs = require('fs');
let html = fs.readFileSync('contact.html', 'utf8');

const newStyle = `
<style id="sticky-footer-fix">
  html, body {
      height: 100%;
  }
  body {
      display: flex !important;
      flex-direction: column !important;
      min-height: 100vh !important;
  }
  main {
      flex: 1 0 auto !important;
  }
  .site-footer {
      flex-shrink: 0 !important;
      margin-top: auto !important;
  }
</style>
</head>`;

html = html.replace('</head>', newStyle);
fs.writeFileSync('contact.html', html, 'utf8');
console.log('Fixed contact.html');
