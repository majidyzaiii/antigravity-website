with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('Bank Transfer')
start = c.rfind('<div class="sub-col-item', 0, idx)
end = c.find('</div>', idx+400)
print(c[start:end+6])
