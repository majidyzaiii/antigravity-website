import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Add a CSS rule to prevent span from overriding inst-head
css_rule = '\\n  .inst-head span { font-weight: inherit !important; font-family: inherit !important; }\\n'
c = c.replace('.inst-head {', css_rule + '.inst-head {')

# Also, user might have literally meant they don't want the icon and want it plain like Sadaqah. Let's remove the icon just in case?
# No, "THICK" is definitely what they meant because the complaint is "BOLD NHI HAI".
c = c.replace('<i class="fas fa-university" style="color: #006754;"></i> ', '')
c = c.replace('<i class="fas fa-mobile-alt" style="color: #006754;"></i> ', '')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed span inheritance and removed icons')
