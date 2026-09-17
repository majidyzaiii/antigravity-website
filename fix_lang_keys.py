with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()
html = html.replace("localStorage.getItem('site_lang')", "sessionStorage.getItem('siteLang')")
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
    
with open("updates.html", "r", encoding="utf-8") as f:
    html = f.read()
html = html.replace("localStorage.getItem('site_lang')", "sessionStorage.getItem('siteLang')")
with open("updates.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed storage keys")
