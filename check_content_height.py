with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

import re
matches = re.findall(r'<img[^>]*brand-title-img-en[^>]*>', html)
for m in matches:
    print("English Title Image:", m)

matches2 = re.findall(r'<img[^>]*assets/logo\.png[^>]*>', html)
for m in matches2:
    print("Logo Image:", m)
    
logo_css = re.search(r'\.header-logo\s*img\s*\{([^\}]*)\}', html)
if logo_css:
    print("Logo CSS:", logo_css.group(1))
