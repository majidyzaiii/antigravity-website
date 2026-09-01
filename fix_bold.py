import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Increase font weight to 800 or 900
c = c.replace('font-weight: 700 !important;\\n    color: #006754 !important;\\n    text-transform: uppercase !important;', 'font-weight: 800 !important;\\n    color: #006754 !important;\\n    text-transform: uppercase !important;')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed bold')
