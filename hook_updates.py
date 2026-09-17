import re

with open("updates.html", "r", encoding="utf-8") as f:
    html = f.read()

# Inject into applyTranslations
if "renderUpdatesForLang(lang);" not in html:
    html = html.replace(
        "    // Also translate footer and any other dynamic text elements",
        "    if(typeof renderUpdatesForLang === 'function') renderUpdatesForLang(lang);\n    // Also translate footer and any other dynamic text elements"
    )

with open("updates.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Hooked applyTranslations in updates.html")
