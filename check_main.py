with open("updates.html", "r", encoding="utf-8") as f:
    html = f.read()
import re
match = re.search(r'(<main[^>]*>[\s\S]*?)</footer', html)
if match:
    print(match.group(1).strip())
else:
    print("Main not found")
