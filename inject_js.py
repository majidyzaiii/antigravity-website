with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('const handle = document.getElementById(\'swipeHandle\');')
start = c.rfind('<script>', 0, idx)
end = c.find('</script>', idx) + 9
script_block = c[start:end]

with open('donation.html', 'r', encoding='utf-8') as f:
    d = f.read()

d = d.replace('</body>', script_block + '\n</body>')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(d)
print("Injected script block")
