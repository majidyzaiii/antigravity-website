import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(
    r'\.sub-col-item h4\s*\{[^}]*\}',
    '.sub-col-item h4 {\\n    font-size: 1.05rem !important;\\n    font-weight: 900 !important;\\n    color: #006754 !important;\\n    text-transform: uppercase !important;\\n    margin: 0 0 12px 0 !important;\\n    font-family: \"Plus Jakarta Sans\", \"Inter\", sans-serif !important;\\n    letter-spacing: -0.5px !important;\\n  }',
    c
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed completely')
