import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'font-weight: 800 !important;\\n    color: #006754 !important;',
    'font-weight: 900 !important;\\n    color: #006754 !important;\\n    letter-spacing: -0.3px !important;'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Forced 900 weight')
