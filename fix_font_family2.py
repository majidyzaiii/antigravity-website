import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(
    r'font-weight:\s*900\s*!important;\s*color:\s*#006754\s*!important;\s*letter-spacing:\s*-0\.3px\s*!important;',
    'font-weight: 900 !important;\\n    color: #006754 !important;\\n    font-family: "Inter", sans-serif !important;\\n    letter-spacing: -0.5px !important;',
    c
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Forced font family')
