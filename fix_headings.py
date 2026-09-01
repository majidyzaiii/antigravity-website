import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix 1: Support Islamic Education
c = c.replace(
    "data-en=\"Support <span class='highlight-font'>Islamic Education</span>\"",
    "data-en=\"Support Islamic Education\""
)
c = c.replace(
    "Support <span class='highlight-font'>Islamic Education</span>",
    "Support Islamic Education"
)

# Fix 2: Official Payment Accounts
c = c.replace(
    '<span class="lang-en">Official Payment <span class="highlight-font">Accounts</span></span>',
    '<span class="lang-en">Official Payment Accounts</span>'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed headings')
