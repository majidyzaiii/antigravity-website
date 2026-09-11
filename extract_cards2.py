with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()
import re
with open('cards.txt', 'w', encoding='utf-8') as out:
    for m in re.finditer(r'<article class="news-card">.*?</article>', c, re.DOTALL):
        out.write(m.group(0))
        out.write('\n---\n')
