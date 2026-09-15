import glob
import re

files = glob.glob("*.html")

for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()

    # Find occurrences of flex-direction: column !important combined with body.rtl header
    if re.search(r'body\.rtl\s*header[\s\S]{0,200}flex-direction:\s*column\s*!important', html):
        print(f"Found column layout in {filename}")
