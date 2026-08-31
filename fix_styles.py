with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re

# Remove the hardcoded inline styles for sub-col-item
c = re.sub(
    r'<div class="sub-col-item" style="[^"]*">',
    '<div class="sub-col-item">',
    c
)

# Replace the h4 inline styles with a simple class or just clean h4
c = re.sub(
    r'<h4 style="[^"]*">([^<]*)<i class="fas fa-university"></i> Bank Transfer\s*</h4>',
    '<h4><span class="lang-en"><i class="fas fa-university" style="color: #006754;"></i> Bank Transfer</span><span class="lang-ur"> </span></h4>',
    c
)
c = re.sub(
    r'<h4 style="[^"]*">([^<]*)<i class="fas fa-mobile-alt"></i> Mobile Wallets\s*</h4>',
    '<h4><span class="lang-en"><i class="fas fa-mobile-alt" style="color: #006754;"></i> Mobile Wallets</span><span class="lang-ur"> </span></h4>',
    c
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed inline styles')
