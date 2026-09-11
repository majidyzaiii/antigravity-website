with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()
import re
for m in re.finditer(r'<article class="news-card">.*?</article>', c, re.DOTALL):
    print(m.group(0))
    print('---')
