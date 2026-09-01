import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the literal \n strings
c = c.replace('.admission-instructions-card \\n  .inst-head span { font-weight: inherit !important; font-family: inherit !important; }\\n.inst-head {', 
              '.admission-instructions-card .inst-head {')

# Now add the span rule correctly, BEFORE the .admission-instructions-card rule, to be safe.
c = c.replace('.admission-instructions-card .inst-head {',
              '.admission-instructions-card .inst-head span { font-weight: inherit !important; font-family: inherit !important; }\\n.admission-instructions-card .inst-head {')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed CSS syntax error')
