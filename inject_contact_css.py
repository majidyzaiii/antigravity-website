import re
with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('.simple-contact-section {')
start = c.rfind('<style', 0, idx)
end = c.find('</style>', idx) + 8
contact_style_block = c[start:end]

with open('donation.html', 'r', encoding='utf-8') as f:
    d = f.read()

# Inject right before <section class="simple-contact-section"
match = re.search(r'<section[^>]*class="simple-contact-section[^>]*>', d)
if match:
    idx2 = match.start()
    d = d[:idx2] + contact_style_block + '\n' + d[idx2:]
    with open('donation.html', 'w', encoding='utf-8') as f:
        f.write(d)
    print("Injected contact style block into donation.html")
else:
    print("Could not find simple-contact-section in donation.html")
