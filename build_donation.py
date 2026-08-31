import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 1. Extract Donation Section (Section 1)
m_don = re.search(r'<section class="donation-section section-card-container".*?</section>', index_html, re.IGNORECASE | re.DOTALL)
donation_section = m_don.group(0)

# Modify Section 1 content
donation_section = re.sub(
    r'<h2 class="preserve-heading donation-title".*?</h2>',
    '<h2 class="preserve-heading donation-title" data-en="<span class=\'bold-text\'>Support</span> <span class=\'highlight-font\'>Islamic Education</span>" data-ur=" "> <span class="bold-text">Support</span> <span class="highlight-font">Islamic Education</span> </h2>',
    donation_section,
    flags=re.DOTALL
)
donation_section = re.sub(
    r'<p class="donation-subtitle".*?</p>',
    '<p class="donation-subtitle" data-en="&quot;The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains.&quot; (Surah Al-Baqarah: 261)" data-ur=" ">"The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains." (Surah Al-Baqarah: 261)</p>',
    donation_section,
    flags=re.DOTALL
)
# Modify descriptions
donation_section = re.sub(
    r'Contribute towards daily meals, utilities, and everyday running expenses of the madrasa\.',
    'Contribute towards daily meals, utilities, and everyday running expenses.',
    donation_section
)
donation_section = re.sub(
    r"Sponsor a full-time residential student's complete monthly educational and living expenses\.",
    "Sponsor a full-time residential student's complete monthly educational and living expenses (Rs. 3,000 / Month).",
    donation_section
)
donation_section = re.sub(
    r'Fulfill your Islamic obligation dedicated exclusively to poor, orphaned, and deserving students\.',
    'Dedicated exclusively to poor, orphaned, and Zakat-eligible students.',
    donation_section
)
donation_section = re.sub(
    r'Earn ongoing Sadqah Jariyah by contributing to classroom construction, wudu areas, and repairs\.',
    'Ongoing Sadqah Jariyah for classroom construction, wudu areas, and repairs.',
    donation_section
)

# 2. Extract Contact Section (Section 2 & 3)
m_con = re.search(r'<section class="simple-contact-section section-card-container"[^>]*>.*?</section>', index_html, re.IGNORECASE | re.DOTALL)
contact_section = m_con.group(0)

# We will modify the contact section to serve as Section 2 (Payment Channels on left) and Section 3 (Form on right)

# Section 2: Payment Channels (Left Column)
payment_channels_html = '''
    <div class="contact-left-col">
      <div class="contact-header-text">
        <h2 class="preserve-heading contact-big-title">
          <span class="lang-en"><span class="highlight-font">Official</span> Payment Accounts</span>
          <span class="lang-ur"> </span>
        </h2>
        <p class="contact-lead-p">
          <span class="lang-en">Transfer your generous donations directly to the official accounts of the Madrasa.</span>
          <span class="lang-ur"> </span>
        </p>
      </div>

      <div class="contact-sub-columns" style="display: flex; flex-direction: column; gap: 30px;">
        <div class="sub-col-item" style="background: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 4px solid #006754;">
          <h4 style="color: #006754; font-size: 1.2rem; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-university"></i> Bank Transfer
          </h4>
          <p style="margin-bottom: 8px;"><strong>Account Title:</strong> Madrasa Riaz ul Quran wal Sunnah</p>
          <p style="margin-bottom: 8px;"><strong>Bank:</strong> Meezan Bank Ltd.</p>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <strong>Account Number:</strong> <span id="acc-num">01010102030405</span>
            <button onclick="navigator.clipboard.writeText('01010102030405'); this.innerText='Copied!'; setTimeout(()=>this.innerHTML='<i class=\'fas fa-copy\'></i> Copy', 2000)" style="background: #eef5f3; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: #006754; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-copy"></i> Copy</button>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <strong>IBAN:</strong> <span id="iban-num">PK00MEZN0001010102030405</span>
            <button onclick="navigator.clipboard.writeText('PK00MEZN0001010102030405'); this.innerText='Copied!'; setTimeout(()=>this.innerHTML='<i class=\'fas fa-copy\'></i> Copy', 2000)" style="background: #eef5f3; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: #006754; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-copy"></i> Copy</button>
          </div>
        </div>

        <div class="sub-col-item" style="background: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 4px solid #006754;">
          <h4 style="color: #006754; font-size: 1.2rem; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-mobile-alt"></i> Mobile Wallets
          </h4>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <strong>EasyPaisa:</strong> <span>0300-1234567</span>
            <button onclick="navigator.clipboard.writeText('0300-1234567'); this.innerText='Copied!'; setTimeout(()=>this.innerHTML='<i class=\'fas fa-copy\'></i> Copy', 2000)" style="background: #eef5f3; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: #006754; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-copy"></i> Copy</button>
            <span style="font-size: 0.85rem; color: #666;">(Madrasa Riaz ul Quran)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <strong>JazzCash:</strong> <span>0300-7654321</span>
            <button onclick="navigator.clipboard.writeText('0300-7654321'); this.innerText='Copied!'; setTimeout(()=>this.innerHTML='<i class=\'fas fa-copy\'></i> Copy', 2000)" style="background: #eef5f3; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: #006754; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-copy"></i> Copy</button>
            <span style="font-size: 0.85rem; color: #666;">(Madrasa Riaz ul Quran)</span>
          </div>
        </div>
      </div>
    </div>
'''

# Section 3: Intimation Form (Right Column)
form_html = '''
    <div class="contact-right-col">
      <div class="floating-form-card">
        <h3 class="form-card-title">
          <span class="lang-en">Donation <span class="highlight-font">Intimation</span></span>
          <span class="lang-ur"> </span>
        </h3>
        <p class="form-card-sub">
          <span class="lang-en">Notify us to receive your official receipt</span>
          <span class="lang-ur"> </span>
        </p>

        <form action="#" method="POST" class="contact-quick-form">
          <div class="form-row-2col">
            <input type="text" placeholder="Donor Full Name" data-en="Donor Full Name" required class="form-input-field">
            <input type="tel" placeholder="WhatsApp Number" data-en="WhatsApp Number" required class="form-input-field">
          </div>
          
          <div class="form-row-2col">
            <input type="number" placeholder="Amount (PKR)" data-en="Amount (PKR)" required class="form-input-field">
            <select class="form-input-field" required style="cursor: pointer; appearance: auto;">
                <option value="" disabled selected>Select Category</option>
                <option value="Sadaqah & General">Sadaqah & General</option>
                <option value="Sponsor a Student">Sponsor a Student</option>
                <option value="100% Zakat Fund">100% Zakat Fund</option>
                <option value="Masjid Extension">Masjid Extension</option>
            </select>
          </div>

          <div class="form-row-2col">
            <select class="form-input-field" required style="cursor: pointer; appearance: auto;">
                <option value="" disabled selected>Transferred Via</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="EasyPaisa">EasyPaisa</option>
                <option value="JazzCash">JazzCash</option>
                <option value="Cash">Cash</option>
            </select>
            <input type="date" required class="form-input-field">
          </div>

          <div class="form-group form-input-wrapper">
            <input type="text" placeholder="Transaction ID / Reference Number" data-en="Transaction ID / Reference Number" class="form-input form-input-field" required>
          </div>

          <!-- Original Swipe Submit Container from index.html -->
          <div class="swipe-submit-container" id="swipeContainer">
            <div class="swipe-text" id="swipeText">
              <span class="lang-en">Swipe to Submit & Request Receipt</span>
              <span class="lang-ur"> </span>
            </div>
            <div class="swipe-handle" id="swipeHandle">
              <svg class="swipe-arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <button type="submit" id="hiddenSubmitBtn" style="display:none;"></button>
          </div>

        </form>
      </div>
    </div>
'''

new_contact_section = '<section class="simple-contact-section section-card-container" id="contact" style="margin-top: 40px;">\n  <div class="contact-main-container">\n' + payment_channels_html + '\n' + form_html + '\n  </div>\n</section>'


# Replace <main style="min-height: 50vh;"></main> in donation.html
with open('donation.html', 'r', encoding='utf-8') as f:
    don_html = f.read()

don_html = re.sub(
    r'<main.*?</main>',
    '<main style="padding-bottom: 60px;">\n' + donation_section + '\n' + new_contact_section + '\n</main>',
    don_html,
    flags=re.DOTALL
)

with open('donation.html', 'w', encoding='utf-8') as f:
    f.write(don_html)

print('Built donation.html')
