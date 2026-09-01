import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Make Support Islamic Education bolder? No, user said it IS bold ("THORA BOLD SA HAI").
# And user wants Official Payment Accounts to be "ISI TRAH" (like that).
c = c.replace(
    '<h2 class="container-main-heading" style="text-align: left !important;">',
    '<h2 class="container-main-heading" style="text-align: left !important; font-weight: 800 !important; color: #1e293b !important;">'
)
c = c.replace(
    '<span class="lang-en">Official Payment Accounts</span>',
    '<span class="lang-en" style="font-weight: 800 !important; color: #1e293b !important;">Official Payment Accounts</span>'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Forced bold')
