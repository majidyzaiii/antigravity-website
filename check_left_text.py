with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('BANK TRANSFER')
start = c.rfind('<div class="contact-sub-columns"', 0, idx)
end = c.find('</div>\n    </div>', start)
print(c[start:end+12])
