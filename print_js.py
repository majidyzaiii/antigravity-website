import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()
match = re.search(r'setTimeout\(\(\) => \{[^}]*success[^}]*\}', c, re.DOTALL)
if match:
    # Print to file to avoid charmap errors
    with open('out.txt', 'w', encoding='utf-8') as out:
        out.write(match.group(0))
