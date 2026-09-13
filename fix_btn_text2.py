import os
import re

files_to_fix = ["about.html", "updates.html", "index.html"]

for filename in files_to_fix:
    if not os.path.exists(filename):
        continue
    with open(filename, "r", encoding="utf-8") as f:
        c = f.read()

    # Use regex to find the exact line and replace
    c = re.sub(r"langSwitchBtn\.textContent\s*=\s*lang\s*===\s*'ur'\s*\?\s*'\?\?\?\?\?'\s*:\s*'URDU';", "langSwitchBtn.textContent = lang === 'ur' ? '\u0627\u0646\u06af\u0631\u06cc\u0632\u06cc' : 'URDU';", c)
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(c)

print("Regex replace done!")
