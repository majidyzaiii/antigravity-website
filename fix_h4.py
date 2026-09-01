import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Update CSS
c = c.replace(
    '.sub-col-item h4 {\\n    font-size: 0.95rem;\\n    font-weight: 800;\\n    color: #111111;\\n    margin: 0 0 8px 0;\\n  }',
    '.sub-col-item h4 {\\n    font-size: 1.05rem;\\n    font-weight: 700;\\n    color: #006754;\\n    text-transform: uppercase;\\n    margin: 0 0 12px 0;\\n  }'
)

# Also try regex if literal replace fails
c = re.sub(
    r'\.sub-col-item h4\s*\{[^}]*color:\s*#111111[^}]*\}',
    '.sub-col-item h4 {\\n    font-size: 1.05rem !important;\\n    font-weight: 700 !important;\\n    color: #006754 !important;\\n    text-transform: uppercase !important;\\n    margin: 0 0 12px 0 !important;\\n  }',
    c
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated h4 style')
