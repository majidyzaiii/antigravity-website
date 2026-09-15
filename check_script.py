with open("updates.html", "r", encoding="utf-8") as f:
    html = f.read()
import re
match = re.findall(r'<script.*?>([\s\S]*?)</script>', html)
for i, m in enumerate(match):
    if len(m.strip()) > 10:
        print(f"--- Script {i} ---")
        print(m[:200].strip())
