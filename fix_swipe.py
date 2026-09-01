import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    '<span class="lang-en">Swipe to Submit & Request Receipt</span>',
    '<span class="lang-en">Swipe to Submit</span>'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed swipe text')
