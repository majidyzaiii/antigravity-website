import re
import glob

files = glob.glob("*.html")
for file in files:
    if file in ["admin.html", "test_ribbon.html", "test_set_prop.html"]:
        continue
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # find all style tags
    styles = re.findall(r'<style.*?>(.*?)</style>', html, re.DOTALL)
    combined_css = "\n".join(styles)
    
    print(f"--- {file} ---")
    rules = re.findall(r'([^\{]*?(?:header-logo|brand-title-img)[^\{]*?\{.*?\})', combined_css, re.DOTALL)
    for r in rules:
        # Simplify the rule text for output
        clean_rule = " ".join(r.split())
        if "max-height" in clean_rule or "height" in clean_rule or "width" in clean_rule:
            print(clean_rule[:200])
