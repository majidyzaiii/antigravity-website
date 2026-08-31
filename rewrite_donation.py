import re

with open('donation.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. First, let's fix the CSS! We need to extract the admission-instructions-card CSS from admissions.html
with open('admissions.html', 'r', encoding='utf-8') as f:
    adm_html = f.read()
    
idx = adm_html.find('.admission-instructions-card {')
start = adm_html.rfind('<style', 0, idx)
end = adm_html.find('</style>', idx) + 8
adm_css = adm_html[start:end]

# Inject it into donation.html right before </head>
c = c.replace('</head>', adm_css + '\n</head>')

# 2. We need to make sure the halftone background CSS is the absolute LAST style in <head> so it overrides backgrounds!
# Let's find the halftone CSS block in donation.html. It contains "Global Container Background Styling (Forced Override)"
idx_half = c.find('Global Container Background Styling (Forced Override)')
if idx_half != -1:
    start_half = c.rfind('<style', 0, idx_half)
    end_half = c.find('</style>', idx_half) + 8
    half_block = c[start_half:end_half]
    
    # Remove it from its current position
    c = c[:start_half] + c[end_half:]
    
    # Re-insert it right before </head>
    c = c.replace('</head>', half_block + '\n</head>')


# 3. Rewrite the HTML of the first section to look like the admissions instructions card
new_section_1 = '''
<section class="about-container admission-instructions-card section-card-container" style="max-width: 1200px !important;">
  <h2 class="container-main-heading" data-en="Support <span class='highlight-font'>Islamic Education</span>" data-ur=" ">Support <span class='highlight-font'>Islamic Education</span></h2>
  
  <p class="donation-subtitle" style="text-align: center; margin-bottom: 40px; color: #4B5563;">"The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains." (Surah Al-Baqarah: 261)</p>
  
  <div class="instructions-content-list" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px;">
    <!-- Point 1 -->
    <div class="instruction-box">
      <h3 class="inst-head" style="font-size: 1.1rem !important;">SADAQAH & GENERAL</h3>
      <ul class="inst-subpoints" style="list-style-type: none; padding-left: 0;">
        <li style="padding-left: 0;">Contribute towards daily meals, utilities, and everyday running expenses.</li>
      </ul>
    </div>

    <!-- Point 2 -->
    <div class="instruction-box">
      <h3 class="inst-head" style="font-size: 1.1rem !important;">SPONSOR A STUDENT</h3>
      <ul class="inst-subpoints" style="list-style-type: none; padding-left: 0;">
        <li style="padding-left: 0;">Sponsor a full-time residential student's complete monthly educational and living expenses (Rs. 3,000 / Month).</li>
      </ul>
    </div>

    <!-- Point 3 -->
    <div class="instruction-box">
      <h3 class="inst-head" style="font-size: 1.1rem !important;">100% ZAKAT FUND</h3>
      <ul class="inst-subpoints" style="list-style-type: none; padding-left: 0;">
        <li style="padding-left: 0;">Dedicated exclusively to poor, orphaned, and Zakat-eligible students.</li>
      </ul>
    </div>

    <!-- Point 4 -->
    <div class="instruction-box" style="grid-column: 1 / -1;">
      <h3 class="inst-head" style="font-size: 1.1rem !important;">MASJID EXTENSION</h3>
      <ul class="inst-subpoints" style="list-style-type: none; padding-left: 0;">
        <li style="padding-left: 0;">Ongoing Sadqah Jariyah for classroom construction, wudu areas, and repairs.</li>
      </ul>
    </div>
  </div>
</section>
'''

# Replace the existing donation-section
c = re.sub(r'<section class="donation-section section-card-container">.*?</section>', new_section_1, c, flags=re.DOTALL)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated donation.html')
