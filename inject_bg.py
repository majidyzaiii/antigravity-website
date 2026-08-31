with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('assets/container-bg.jpg')
start = c.rfind('<style', 0, idx)
end = c.find('</style>', idx) + 8
bg_style = c[start:end]

with open('donation.html', 'r', encoding='utf-8') as f:
    d = f.read()

# Inject into <head>
d = d.replace('</head>', bg_style + '\n</head>')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(d)
print("Injected global background styling")
