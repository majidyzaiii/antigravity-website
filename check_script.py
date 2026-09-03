with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.finditer(r'<script.*?>[^<]*intlTelInput.*?</script>', c, re.DOTALL)
for m in matches:
    print(m.group(0)[:150])
