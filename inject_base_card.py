with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('.section-card-container {')
start = c.rfind('<style', 0, idx)
end = c.find('</style>', idx) + 8
base_card_style = c[start:end]

with open('donation.html', 'r', encoding='utf-8') as f:
    d = f.read()

d = d.replace('</head>', base_card_style + '\n</head>')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(d)
print("Injected base section-card-container styling")
