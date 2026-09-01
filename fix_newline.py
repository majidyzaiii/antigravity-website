with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('\\n', '\n')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Replaced literal backslash-n with actual newlines')
