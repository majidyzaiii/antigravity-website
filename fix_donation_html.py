import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Remove inline styles from inst-head
c = re.sub(r'<h3 class="inst-head" style="[^"]*">', '<h3 class="inst-head">', c)

# Remove inline styles from inst-subpoints
c = re.sub(r'<ul class="inst-subpoints" style="[^"]*">', '<ul class="inst-subpoints">', c)

# Remove inline styles from li
c = re.sub(r'<li style="[^"]*">', '<li>', c)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Cleaned inline styles')
