with open("about.html", "r", encoding="utf-8") as f:
    html = f.read()

import re
match = re.search(r'(html\[lang="ur"\]\s*header[^\{]*\{[^\}]*flex-direction:\s*column\s*!important[^\}]*\})', html)
if match:
    print(match.group(1))
