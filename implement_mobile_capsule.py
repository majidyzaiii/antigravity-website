import glob
import re

html_files = glob.glob("*.html")

capsule_css_html = """
<!-- ========================================== -->
<!-- NEW MODERN CAPSULE MOBILE MENU (SCOPE: < 769px) -->
<!-- ========================================== -->
<style id="modern-capsule-nav">
@media (max-width: 768px) {
    /* Hide old mobile menu overlay forcefully ONLY on mobile */
    html:root body #mobileNavOverlay,
    html:root body .mobile-nav-overlay,
    html:root body #drawerOverlay,
    html:root body #mobileDrawer {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -999 !important;
    }

    /* Base overlay styling */
    .capsule-nav-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(15, 23, 42, 0.35) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        z-index: 10000 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease !important;
    }

    .capsule-nav-overlay.is-active {
        opacity: 1 !important;
        pointer-events: auto !important;
    }

    /* Container for staggered capsules */
    .capsule-nav-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        width: 90% !important;
        max-width: 320px !important;
    }

    /* Individual Capsule */
    .capsule-item {
        display: flex !important;
        align-items: center !important;
        background: #ffffff !important;
        border: 1px solid rgba(226, 232, 240, 0.8) !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07) !important;
        border-radius: 9999px !important;
        padding: 12px 20px !important;
        text-decoration: none !important;
        color: #1e293b !important;
        font-weight: 700 !important;
        font-family: 'Outfit', sans-serif !important;
        font-size: 16px !important;
        transition: background 0.2s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease !important;
        opacity: 0;
        cursor: pointer !important;
        -webkit-tap-highlight-color: transparent !important;
    }

    .capsule-item:active {
        background: #f0fdf4 !important;
    }

    /* unified green icon badge */
    .capsule-icon-badge {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        background: #ecfdf5 !important;
        border: 1px solid #d1fae5 !important;
        color: #047857 !important;
        flex-shrink: 0 !important;
    }
    .capsule-icon-badge svg {
        width: 18px !important;
        height: 18px !important;
        stroke: currentColor !important;
        fill: none !important;
        stroke-width: 2.2 !important;
        stroke-linecap: round !important;
        stroke-linejoin: round !important;
    }

    .capsule-text {
        flex-grow: 1 !important;
        margin: 0 !important;
    }

    /* --- ANIMATION & DIRECTION RULES --- */
    /* Default (English / LTR) */
    .capsule-item {
        transform: translateX(100%);
    }
    .capsule-item .capsule-icon-badge {
        margin-right: 14px !important;
        margin-left: 0 !important;
    }
    .capsule-text {
        text-align: left !important;
    }

    /* Urdu / RTL */
    html[dir="rtl"] .capsule-item,
    html[lang="ur"] .capsule-item {
        transform: translateX(-100%);
        font-family: 'Jameel Noori Nastaleeq', Arial, sans-serif !important;
        font-size: 22px !important; /* Slightly larger for Urdu readability */
    }
    html[dir="rtl"] .capsule-item .capsule-icon-badge,
    html[lang="ur"] .capsule-item .capsule-icon-badge {
        margin-right: 0 !important;
        margin-left: 14px !important;
        order: 2 !important; /* Move icon to the right */
    }
    html[dir="rtl"] .capsule-text,
    html[lang="ur"] .capsule-text {
        text-align: right !important;
        order: 1 !important;
    }

    /* Ensure lang switch stays Outfit in Urdu mode if text is English */
    html[dir="rtl"] .capsule-lang-item .capsule-text,
    html[lang="ur"] .capsule-lang-item .capsule-text {
        font-family: 'Outfit', sans-serif !important;
        font-size: 16px !important;
    }

    /* Active Entrance Animation */
    .capsule-nav-overlay.is-active .capsule-item {
        transform: translateX(0) !important;
        opacity: 1 !important;
    }

    /* Closing Exit Animation */
    .capsule-nav-overlay.is-closing .capsule-item {
        opacity: 0 !important;
    }
    html:not([dir="rtl"]) .capsule-nav-overlay.is-closing .capsule-item {
        transform: translateX(100%) !important;
    }
    html[dir="rtl"] .capsule-nav-overlay.is-closing .capsule-item,
    html[lang="ur"] .capsule-nav-overlay.is-closing .capsule-item {
        transform: translateX(-100%) !important;
    }

    /* Sequential Stagger Cascade */
    .capsule-nav-overlay.is-active .capsule-item:nth-child(1) { transition-delay: 0.05s !important; }
    .capsule-nav-overlay.is-active .capsule-item:nth-child(2) { transition-delay: 0.10s !important; }
    .capsule-nav-overlay.is-active .capsule-item:nth-child(3) { transition-delay: 0.15s !important; }
    .capsule-nav-overlay.is-active .capsule-item:nth-child(4) { transition-delay: 0.20s !important; }
    .capsule-nav-overlay.is-active .capsule-item:nth-child(5) { transition-delay: 0.25s !important; }
    .capsule-nav-overlay.is-active .capsule-item:nth-child(6) { transition-delay: 0.30s !important; }
    .capsule-nav-overlay.is-active .capsule-item:nth-child(7) { transition-delay: 0.35s !important; }

    /* Reverse Stagger on Close */
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(1) { transition-delay: 0.35s !important; }
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(2) { transition-delay: 0.30s !important; }
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(3) { transition-delay: 0.25s !important; }
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(4) { transition-delay: 0.20s !important; }
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(5) { transition-delay: 0.15s !important; }
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(6) { transition-delay: 0.10s !important; }
    .capsule-nav-overlay.is-closing .capsule-item:nth-child(7) { transition-delay: 0.05s !important; }

    /* Close Button */
    .capsule-close-btn {
        width: 52px !important;
        height: 52px !important;
        border-radius: 50% !important;
        background: #ffffff !important;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
        border: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin-top: 40px !important;
        cursor: pointer !important;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        transition-delay: 0.4s !important;
        -webkit-tap-highlight-color: transparent !important;
    }
    .capsule-nav-overlay.is-active .capsule-close-btn {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
    .capsule-nav-overlay.is-closing .capsule-close-btn {
        opacity: 0 !important;
        transform: scale(0.8) !important;
        transition-delay: 0s !important;
    }
}

/* Ensure Desktop stays hidden completely */
@media (min-width: 769px) {
    .capsule-nav-overlay {
        display: none !important;
    }
}
</style>

<div class="capsule-nav-overlay" id="capsuleNavOverlay">
    <div class="capsule-nav-container">
        <a href="index.html" class="capsule-item">
            <div class="capsule-icon-badge"><svg><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
            <div class="capsule-text" data-en="HOME" data-ur="???">HOME</div>
        </a>
        <a href="about.html" class="capsule-item">
            <div class="capsule-icon-badge"><svg><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
            <div class="capsule-text" data-en="ABOUT US" data-ur="????? ???? ???">ABOUT US</div>
        </a>
        <a href="admissions.html" class="capsule-item">
            <div class="capsule-icon-badge"><svg><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></div>
            <div class="capsule-text" data-en="ADMISSIONS" data-ur="?????">ADMISSIONS</div>
        </a>
        <a href="updates.html" class="capsule-item">
            <div class="capsule-icon-badge"><svg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
            <div class="capsule-text" data-en="UPDATES" data-ur="??????">UPDATES</div>
        </a>
        <a href="donation.html" class="capsule-item">
            <div class="capsule-icon-badge"><svg><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
            <div class="capsule-text" data-en="DONATION" data-ur="?????">DONATION</div>
        </a>
        <a href="contact.html" class="capsule-item">
            <div class="capsule-icon-badge"><svg><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
            <div class="capsule-text" data-en="CONTACT US" data-ur="?????">CONTACT US</div>
        </a>
        <div class="capsule-item capsule-lang-item" id="capsuleLangBtn">
            <div class="capsule-icon-badge"><svg><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
            <div class="capsule-text" data-en="URDU" data-ur="English">URDU</div>
        </div>
    </div>
    
    <button class="capsule-close-btn" id="capsuleCloseBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('capsuleNavOverlay');
    const closeBtn = document.getElementById('capsuleCloseBtn');
    const langBtn = document.getElementById('capsuleLangBtn');
    
    // Setup universal click listener for any hamburger buttons
    document.body.addEventListener('click', (e) => {
        const hamburger = e.target.closest('.mobile-menu-btn') || e.target.closest('.minimal-hamburger-btn');
        if(hamburger) {
            e.preventDefault();
            e.stopPropagation();
            if(window.innerWidth < 769) {
                overlay.classList.remove('is-closing');
                overlay.classList.add('is-active');
            }
        }
    }, true);

    function closeOverlay() {
        overlay.classList.add('is-closing');
        setTimeout(() => {
            overlay.classList.remove('is-active', 'is-closing');
        }, 500); // Wait for reverse stagger to finish
    }

    if(closeBtn) closeBtn.addEventListener('click', closeOverlay);
    
    // Clicking backdrop closes menu
    if(overlay) {
        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                closeOverlay();
            }
        });
    }

    if(langBtn) {
        langBtn.addEventListener('click', () => {
            const realLangBtn = document.getElementById('langSwitch');
            if(realLangBtn) realLangBtn.click();
            // Close after language switch
            setTimeout(closeOverlay, 300);
        });
    }
});
</script>
"""

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Remove existing injection if present to allow rerunning
    html = re.sub(r'<!-- ========================================== -->\n<!-- NEW MODERN CAPSULE MOBILE MENU.*?</script>', '', html, flags=re.DOTALL)
    
    # Inject before </body> if present, else append
    if "</body>" in html:
        html = html.replace("</body>", capsule_css_html + "\n</body>")
    else:
        html += "\n" + capsule_css_html

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Injected capsule menu safely scoped to mobile into {file_path}")

