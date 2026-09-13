import os
import re

files_to_fix = ["about.html", "updates.html", "index.html", "contact.html", "donation.html"]

for filename in files_to_fix:
    if not os.path.exists(filename):
        continue
    with open(filename, "r", encoding="utf-8") as f:
        c = f.read()

    # 1. Update the JS to modify ALL lang toggle buttons, not just the first ID match
    c = re.sub(
        r"if\s*\(\s*langSwitchBtn\s*\)\s*langSwitchBtn\.textContent\s*=\s*lang\s*===\s*'ur'\s*\?\s*'.*?'\s*:\s*'URDU';",
        "document.querySelectorAll('#langSwitch, .lang-toggle-btn').forEach(btn => btn.textContent = lang === 'ur' ? '\u0627\u0646\u06af\u0631\u06cc\u0632\u06cc' : 'URDU');",
        c
    )
    
    # 2. Update the mobile button data attributes just in case
    c = c.replace('data-ur="ENGLISH"', 'data-ur="\u0627\u0646\u06af\u0631\u06cc\u0632\u06cc"')
    c = c.replace('data-ur="English"', 'data-ur="\u0627\u0646\u06af\u0631\u06cc\u0632\u06cc"')

    with open(filename, "w", encoding="utf-8") as f:
        f.write(c)

print("All buttons fixed!")
