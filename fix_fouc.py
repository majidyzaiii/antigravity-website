import glob

files = glob.glob("*.html")

head_style = """
<!-- ANTI-FLICKER FIX FOR HEADER ELEMENTS -->
<style id="anti-flicker-header">
/* Hide old buttons and breadcrumbs IMMEDIATELY before body renders */
div.about-minimal-header button.minimal-back-btn,
div.about-minimal-header button.minimal-hamburger-btn,
div.about-minimal-header button[onclick*="history.back"],
#desktopHideBtn1, #desktopHideBtn2,
div.about-minimal-header .minimal-breadcrumbs,
div.about-minimal-header .about-breadcrumb {
    display: none !important;
}

/* Pre-center the title IMMEDIATELY so it never jumps from the left */
div.about-minimal-header {
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

div.about-minimal-header h1.about-main-title,
div.about-minimal-header h1.minimal-title {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    text-align: center !important;
}
</style>
"""

for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Remove existing anti-flicker block if it exists
    if '<style id="anti-flicker-header">' in html:
        import re
        html = re.sub(r'<style id="anti-flicker-header">.*?</style>', '', html, flags=re.DOTALL)
        html = html.replace('<!-- ANTI-FLICKER FIX FOR HEADER ELEMENTS -->', '')
        
    # Inject into head right after <head> tag
    if "<head>" in html:
        html = html.replace("<head>", "<head>\n" + head_style)
    else:
        # Fallback if no <head> tag
        html = head_style + "\n" + html
        
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Fixed FOUC in {filename}")
