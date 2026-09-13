import os

files_to_fix = ["about.html", "updates.html", "index.html"]

for filename in files_to_fix:
    if not os.path.exists(filename):
        continue
    with open(filename, "r", encoding="utf-8") as f:
        c = f.read()

    # Replace literal '?????' with unicode escape in the applyTranslations function
    # Note: we need to be careful not to replace other instances of ?????
    # So we replace the specific line
    c = c.replace("langSwitchBtn.textContent = lang === 'ur' ? '?????' : 'URDU';", "langSwitchBtn.textContent = lang === 'ur' ? '\u0627\u0646\u06af\u0631\u06cc\u0632\u06cc' : 'URDU';")

    with open(filename, "w", encoding="utf-8") as f:
        f.write(c)

print("Fixed language button text!")
