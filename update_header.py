import re

with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CSS for hamburger and breadcrumbs inside the first <style> tag
css_to_add = '''
.minimal-hamburger-btn {
  position: absolute !important;
  top: 30px !important;
  right: 20px !important;
  background: transparent !important;
  border: none !important;
  color: #ffffff !important;
  cursor: pointer !important;
  padding: 0 !important;
  z-index: 100 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.minimal-hamburger-btn:hover {
  opacity: 0.7 !important;
}
[dir="rtl"] .minimal-hamburger-btn {
  right: auto !important;
  left: 20px !important; /* Move hamburger to left in RTL if back btn is on right */
}
[dir="rtl"] .minimal-back-btn {
  left: auto !important;
  right: 20px !important; /* Fix back btn to be on right in RTL */
}
[dir="rtl"] .minimal-back-btn svg {
  transform: rotate(180deg) !important;
}

.minimal-breadcrumbs {
  position: absolute !important;
  bottom: 20px !important;
  left: 20px !important;
  color: #ffffff !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
}
.minimal-breadcrumbs .chevron {
  color: #a3e635 !important;
  margin: 0 6px !important;
  font-weight: 800 !important;
}
[dir="rtl"] .minimal-breadcrumbs {
  left: auto !important;
  right: 20px !important;
  font-family: 'Jameel Noori Nastaleeq', serif !important;
  font-size: 1.1rem !important;
}
'''
content = content.replace('/* Minimal Header Container */', css_to_add + '\n/* Minimal Header Container */')

# 2. Update Urdu Header HTML
urdu_html_old = r'<div class="about-minimal-header">\s*<!-- Back Button -->.*?</h1>'
urdu_html_new = '''<div class="about-minimal-header">
  <!-- Hamburger Menu -->
  <button class="minimal-hamburger-btn" onclick="document.getElementById('mobileNavOverlay').classList.add('is-active')" aria-label="Toggle Menu">
    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>

  <!-- Back Button -->
  <button class="minimal-back-btn" onclick="window.history.back() || (window.location.href='index.html')">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  </button>

  <!-- Breadcrumbs -->
  <div class="minimal-breadcrumbs">
    مرکزی صفحہ <span class="chevron" style="font-family: sans-serif;">&lt;</span> ہمارے بارے میں
  </div>

  <!-- Centered Title with Green Swoosh -->
  <div class="title-with-swoosh">
    <h1 class="about-main-title">
      <span class="title-en">About Us</span>
      <span class="title-ur">ہمارے بارے میں</span>
    </h1>'''
# I will do this safely using a more targeted replace on the specific blocks
# Let's find the exact blocks
