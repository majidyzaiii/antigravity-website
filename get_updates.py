with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
start = c.find('<section class="updates-section"')
end = c.find('</section>', start)
with open('output_updates.txt', 'w', encoding='utf-8') as out:
    out.write(c[start:end])
