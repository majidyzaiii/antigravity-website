
const fs = require("fs");
const html = fs.readFileSync("donation.html", "utf8");
const start = html.indexOf("<style id=\"compact-menu-fix\">");
console.log(html.substring(start - 500, start));

