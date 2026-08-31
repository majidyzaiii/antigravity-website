import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('style="cursor: pointer; appearance: auto;"', 'style="cursor: pointer; appearance: auto; padding-right: 35px;"')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Updated padding')
