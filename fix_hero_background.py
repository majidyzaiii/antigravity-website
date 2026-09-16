import glob
import re

files = glob.glob("*.html")

style_block = """
<!-- EXTEND HERO BACKGROUND TO TOP FIX -->
<style id="extend-hero-bg-fix">
@media (min-width: 769px) {
    /* Pull the hero section up to cover the body padding, and increase its padding so content stays in place */
    html body .hero-section {
        margin-top: -150px !important;
        padding-top: 250px !important;
    }
}
</style>
"""

for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()
        
    html = re.sub(r'<style id="extend-hero-bg-fix">.*?</style>', '', html, flags=re.DOTALL)
    html = html.replace('<!-- EXTEND HERO BACKGROUND TO TOP FIX -->\n', '')
    
    if "</head>" in html:
        html = html.replace("</head>", style_block + "\n</head>")
        
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Fixed {filename}")
