import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Extract the main style block
idx = c.find('.floating-form-card')
start = c.rfind('<style', 0, idx)
end = c.find('</style>', idx) + 8
style_block = c[start:end]

# Find all rules related to contact or floating form
contact_rules = re.findall(r'([^\}]*(?:contact-|floating-form-|swipe-)[^\}]*\{[^}]*\})', style_block)

css_to_inject = "<style>\n" + "\n".join(contact_rules) + "\n</style>"

with open('donation.html', 'r', encoding='utf-8') as f:
    d = f.read()

d = d.replace('</head>', css_to_inject + '\n</head>')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(d)
print("Injected missing CSS")
