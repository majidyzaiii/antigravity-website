import re

files = ['index.html', 'about.html', 'admissions.html', 'updates.html', 'contact.html', 'donation.html']
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # We only care about the scroll header if it exists, or the main header
    # Let's just find the first brand-title-img-en
    title_match = re.search(r'class="brand-title-img-en".*?>', html)
    logo_match = re.search(r'class="header-logo desktop-logo">\s*<img.*?>', html)
    
    print(f"--- {file} ---")
    if title_match:
        print("Title:", title_match.group(0))
    if logo_match:
        print("Logo:", logo_match.group(0).strip())
