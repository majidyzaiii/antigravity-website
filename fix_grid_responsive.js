const fs = require('fs');
let html = fs.readFileSync('updates.html', 'utf8');
const responsiveGrid = `
@media (max-width: 1024px) {
    #dynamic-updates-container {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
@media (max-width: 768px) {
    #dynamic-updates-container {
        grid-template-columns: 1fr !important;
    }
}
`;
if (!html.includes('grid-template-columns: repeat(2, 1fr) !important;')) {
    html = html.replace('</style>', responsiveGrid + '\n</style>');
    fs.writeFileSync('updates.html', html, 'utf8');
    console.log('Added media queries');
} else {
    console.log('Already has media queries');
}
