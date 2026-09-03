with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('Transfer your generous donations')
start = c.rfind('<p', 0, idx)
end = c.find('</p>', idx)
print(c[start:end+4])
