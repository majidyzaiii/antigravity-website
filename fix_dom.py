import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    '<h4><span class="lang-en"><i class="fas fa-university" style="color: #006754;"></i> Bank Transfer</span><span class="lang-ur"> </span></h4>',
    '<h3 class="inst-head" style="text-transform: uppercase;"><span class="lang-en"><i class="fas fa-university" style="color: #006754;"></i> Bank Transfer</span><span class="lang-ur"> </span></h3>'
)

c = c.replace(
    '<h4><span class="lang-en"><i class="fas fa-mobile-alt" style="color: #006754;"></i> Mobile Wallets</span><span class="lang-ur"> </span></h4>',
    '<h3 class="inst-head" style="text-transform: uppercase;"><span class="lang-en"><i class="fas fa-mobile-alt" style="color: #006754;"></i> Mobile Wallets</span><span class="lang-ur"> </span></h3>'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed DOM elements')
