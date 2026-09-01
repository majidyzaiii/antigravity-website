import re
with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

mobile_css = '''
<style>
@media (max-width: 768px) {
  .swipe-text {
    font-size: 0.75rem !important;
  }
}
</style>
'''

c = c.replace('</head>', mobile_css + '\n</head>')

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Added mobile CSS')
