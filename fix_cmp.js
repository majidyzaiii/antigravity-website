
const fs = require("fs");
const idx = fs.readFileSync("index.html", "utf8");
const don = fs.readFileSync("donation.html", "utf8");
const re = /<ul class="mobile-nav-links">([\s\S]*?)<\/ul>/;
console.log("INDEX:");
console.log(idx.match(re)[1].trim());
console.log("DONATION:");
console.log(don.match(re)[1].trim());

