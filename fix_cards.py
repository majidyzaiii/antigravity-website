import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(
    r'data-en="ONE-TIME DONATION".*?>ONE-TIME DONATION</h4>',
    'data-en="SADAQAH &amp; GENERAL" data-ur=" ">SADAQAH &amp; GENERAL</h4>',
    c
)
c = re.sub(
    r'data-en="Make a single contribution to support our institute\'s general needs\.".*?>Make a single contribution to support our institute\'s general needs\.</p>',
    'data-en="Contribute towards daily meals, utilities, and everyday running expenses of the madrasa." data-ur=" ">Contribute towards daily meals, utilities, and everyday running expenses of the madrasa.</p>',
    c
)

c = re.sub(
    r'data-en="GIVE MONTHLY".*?>GIVE MONTHLY</h4>',
    'data-en="SPONSOR A STUDENT" data-ur=" ">SPONSOR A STUDENT</h4>',
    c
)
c = re.sub(
    r'data-en="Become a recurring donor to provide consistent support\.".*?>Become a recurring donor to provide consistent support\.</p>',
    'data-en="Sponsor a full-time residential student\'s complete monthly educational and living expenses." data-ur=" ">Sponsor a full-time residential student\'s complete monthly educational and living expenses.</p>',
    c
)

c = re.sub(
    r'data-en="GIVE A SCHOLARSHIP".*?>GIVE A SCHOLARSHIP</h4>',
    'data-en="100% ZAKAT FUND" data-ur=" ">100% ZAKAT FUND</h4>',
    c
)
c = re.sub(
    r'data-en="Sponsor a student\'s education and shape their future\.".*?>Sponsor a student\'s education and shape their future\.</p>',
    'data-en="Fulfill your Islamic obligation dedicated exclusively to poor, orphaned, and deserving students." data-ur=" ">Fulfill your Islamic obligation dedicated exclusively to poor, orphaned, and deserving students.</p>',
    c
)

c = re.sub(
    r'data-en="SPONSOR A TEACHER".*?>SPONSOR A TEACHER</h4>',
    'data-en="MASJID EXTENSION" data-ur=" ">MASJID EXTENSION</h4>',
    c
)
c = re.sub(
    r'data-en="Support our dedicated teachers who shape the next generation\.".*?>Support our dedicated teachers who shape the next generation\.</p>',
    'data-en="Earn ongoing Sadqah Jariyah by contributing to classroom construction, wudu areas, and repairs." data-ur=" ">Earn ongoing Sadqah Jariyah by contributing to classroom construction, wudu areas, and repairs.</p>',
    c
)

css_fix = '''
<style>
/* Fix title word sticking issue while preserving exact font and styling */
.support-mission-card h3,
.mission-card-title,
.info-card-title {
  letter-spacing: 0.5px !important;
  word-spacing: 2px !important;
}
</style>
'''
c = c.replace('</head>', css_fix + '</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated content.')
