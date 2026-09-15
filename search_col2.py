import glob
import re

files = glob.glob("*.html")

for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()

    if re.search(r'html\[lang="ur"\]\s*header[\s\S]{0,200}flex-direction:\s*column\s*!important', html):
        print(f"Found column layout in {filename}")
