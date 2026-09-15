with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()
import re
match = re.search(r'header\s*\{([^\}]*)\}', html)
if match:
    print(match.group(1))
