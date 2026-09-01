import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

m = re.search(r'<h2 class="container-main-heading".*?Official Payment Accounts', c, re.DOTALL)
if m: print(m.group(0))
