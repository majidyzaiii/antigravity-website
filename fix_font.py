import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace the classes for the Official Payment Accounts heading
c = c.replace(
    '<h2 class="preserve-heading contact-big-title">',
    '<h2 class="container-main-heading" style="text-align: left !important;">'
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed font class')
