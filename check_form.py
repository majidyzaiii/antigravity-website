with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('floating-form-card')
end = c.find('</form>', idx)
with open('out.txt', 'w', encoding='utf-8') as o:
    o.write(c[idx:end+7])
