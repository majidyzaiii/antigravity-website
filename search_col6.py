import glob
import re

files = glob.glob("*.html")

for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()

    match = re.search(r'(html\[lang="ur"\]\s*header[^\{]*\{[^\}]*flex-direction:\s*column\s*!important[^\}]*\})', html)
    if match:
        print(f"{filename} has it.")
