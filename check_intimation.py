with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('Intimation')
if idx != -1:
    start = c.rfind('<div class=', 0, idx)
    print(c[start:idx+150])
