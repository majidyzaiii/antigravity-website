import sys
import re

css = """
<style>
/* Minimal Header Container */
.about-minimal-header {
  position: relative !important;
  background: linear-gradient(135deg, rgba(2, 95, 85, 0.92) 0%, rgba(0, 77, 68, 0.94) 60%, rgba(1, 56, 50, 0.96) 100%), url('assets/header-bg.jpg') center center / cover no-repeat !important;
  padding: 20px 20px 30px 20px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 25px !important;
  padding-bottom: 30px !important;
}

/* Floating Back Button */
.minimal-back-btn {
  left: 20px !important;
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 50% !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  width: 44px !important;
  height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  z-index: 10 !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
}

/* Floating Hamburger Menu */
.minimal-hamburger-btn {
  right: 20px !important;
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 50% !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  width: 44px !important;
  height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  z-index: 10 !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
}

.about-main-title {
  color: #ffffff !important;
  font-size: 2.2rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  margin: 0 !important;
  text-align: center !important;
  position: relative !important;
  display: inline-block !important;
  z-index: 1 !important;
}

.title-with-swoosh {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

.minimal-breadcrumbs {
  margin-top: 12px !important;
  bottom: 0 !important;
  font-family: inherit !important;
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  z-index: 1 !important;
}

.minimal-breadcrumbs .chevron {
  font-size: 0.85rem !important;
  opacity: 0.7 !important;
}

/* Mobile Overrides */
@media (max-width: 768px) {
  .about-minimal-header {
    border-top: 45px solid #ffffff !important;
    padding-top: 20px !important;
  }
  
  html body div.about-minimal-header button.minimal-back-btn,
  html body div.about-minimal-header button[onclick*="history.back"],
  html body div.about-minimal-header button.minimal-hamburger-btn {
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border-radius: 0 !important;
    width: auto !important;
    height: auto !important;
    min-width: unset !important;
    min-height: unset !important;
    padding: 6px !important;
    position: absolute !important;
    top: -40px !important;
    z-index: 999 !important;
    color: #006754 !important;
  }

  html[dir="ltr"] body div.about-minimal-header button.minimal-back-btn,
  html:not([dir="rtl"]) body div.about-minimal-header button.minimal-back-btn {
    left: 10px !important;
    right: auto !important;
  }

  html[dir="ltr"] body div.about-minimal-header button.minimal-hamburger-btn,
  html:not([dir="rtl"]) body div.about-minimal-header button.minimal-hamburger-btn {
    right: 10px !important;
    left: auto !important;
  }

  html[dir="rtl"] body div.about-minimal-header button.minimal-back-btn,
  html[dir="rtl"] body div.about-minimal-header button[onclick*="history.back"] {
    right: 10px !important;
    left: auto !important;
  }

  html[dir="rtl"] body div.about-minimal-header button.minimal-hamburger-btn {
    left: 10px !important;
    right: auto !important;
  }

  html body div.about-minimal-header button.minimal-back-btn svg,
  html body div.about-minimal-header button[onclick*="history.back"] svg,
  html body div.about-minimal-header button.minimal-hamburger-btn svg {
    width: 24px !important;
    height: 24px !important;
    stroke: #006754 !important;
  }
  
  html body div.about-minimal-header button.minimal-back-btn:hover,
  html body div.about-minimal-header button[onclick*="history.back"]:hover,
  html body div.about-minimal-header button.minimal-hamburger-btn:hover {
    background: transparent !important;
    opacity: 0.7 !important;
  }
}

/* Transparent Logo Watermark behind Header Title */
.about-minimal-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('assets/logo.png');
  background-size: auto 95%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.12;
  z-index: 0;
  pointer-events: none;
}

.about-minimal-header > * {
  position: relative;
  z-index: 1;
}

/* Hide old headers */
.hide-main-header .sticky-header,
.hide-main-header header.main-header,
.hide-main-header header.site-header,
.hide-main-header header,
.hide-main-header .top-header-bar,
.hide-main-header .mobile-logo-container {
    display: none !important;
}
</style>
"""

html_template = """
<div class="about-minimal-header">
  <button class="minimal-hamburger-btn" onclick="document.getElementById('mobileNavOverlay').classList.add('active'); document.querySelector('#mobileNavOverlay .mobile-menu-card').classList.add('active');" aria-label="Toggle Menu">
    <svg viewBox="0 0 24 24" width="28" height="28" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>
  <button class="minimal-back-btn" onclick="window.history.back() || (window.location.href='index.html')">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <div class="title-with-swoosh">
    <h1 class="about-main-title" data-en="{title_en}" data-ur="{title_ur}">
      {title_en}
    </h1>
    <div class="minimal-breadcrumbs" style="margin-top: 8px !important;" data-en="<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='margin-right: 4px; position:relative; top:-1px;'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path><polyline points='9 22 9 12 15 12 15 22'></polyline></svg>Home <span class='chevron'>&gt;</span> {title_en}" data-ur="ہوم <span class='chevron' style='font-family: sans-serif;'>&lt;</span> {title_ur}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; position:relative; top:-1px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Home <span class="chevron">&gt;</span> {title_en}
    </div>
  </div>
</div>
"""

def process_file(filename, title_en, title_ur):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'about-minimal-header' in content and 'hide-main-header' in content:
        print(f'{filename} already processed!')
        return

    # Add hide-main-header class to body
    content = re.sub(r'<body(.*?)>', r'<body\1 class="hide-main-header">', content)
    
    injection = css + '\n' + html_template.format(title_en=title_en, title_ur=title_ur)
    
    match = re.search(r'<div class="sticky-header">.*?</header>\s*</div>', content, re.DOTALL)
    if match:
        end_idx = match.end()
        content = content[:end_idx] + '\n' + injection + '\n' + content[end_idx:]
    else:
        # Fallback to after body tag if sticky-header not found
        content = re.sub(r'(<body.*?>)', r'\g<1>\n' + injection, content, count=1)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {filename}')

process_file('donation.html', 'Donation', 'عطیات')
process_file('contact.html', 'Contact Us', 'رابطہ کریں')
