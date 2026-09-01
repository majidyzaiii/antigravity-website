import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'display: flex; align-items: center; gap: 10px;',
    'display: flex; flex-wrap: wrap; align-items: center; gap: 10px;'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed flex wrap')
