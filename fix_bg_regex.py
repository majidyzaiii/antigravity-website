import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace body, main, section { background-color: #FFFFFF !important; }
c = re.sub(
    r'body,\s*main,\s*section\s*\{[^}]*background-color:\s*#FFFFFF\s*!important;\s*\}',
    'body, main, section { background-color: transparent !important; }',
    c
)

# Replace .contact-main-container in the big comma separated list
c = re.sub(
    r'\.contact-main-container,\s*\.contact-page-grid,\s*\.services-section,\s*\.news-section,\s*\.about-section\s*\{[^}]*background-color:\s*#FFFFFF\s*!important;\s*\}',
    '.contact-main-container, .contact-page-grid, .services-section, .news-section, .about-section { background-color: transparent !important; }',
    c
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed via regex')
