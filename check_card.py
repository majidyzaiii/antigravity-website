with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('Donation Intimation')
start = c.rfind('<div class="', 0, idx)
print(c[start:start+150])
