import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Fix the main background being white!
c = c.replace(
    'body, main, section {\\n      background-color: #FFFFFF !important;\\n    }',
    'body, main {\\n      background-color: transparent !important;\\n    }'
)
c = c.replace(
    'body, main, section { background-color: #FFFFFF !important; }',
    'body, main { background-color: transparent !important; }'
)

# 2. Fix the solid white block inside the Official Accounts card
# The contact-main-container is covering the halftone!
c = c.replace(
    '.contact-main-container,\\n    .contact-page-grid,\\n    .services-section,\\n    .news-section,\\n    .about-section {\\n      background-color: #FFFFFF !important;\\n    }',
    '.contact-page-grid,\\n    .services-section,\\n    .news-section,\\n    .about-section {\\n      background-color: transparent !important;\\n    }'
)

# Also inline override just to be safe
c = c.replace(
    '<div class="contact-main-container">',
    '<div class="contact-main-container" style="background-color: transparent !important;">'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed backgrounds')
