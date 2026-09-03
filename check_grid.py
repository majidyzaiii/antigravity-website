with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('contact-left-col')
start = c.rfind('<div', 0, idx-10)
print(c[start:idx+150])
