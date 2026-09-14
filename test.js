
document.addEventListener("DOMContentLoaded", () => {
    const scrollHeader = document.querySelector('.scroll-home-header');
    if(scrollHeader) {
        if (scrollHeader.parentNode !== document.body) {
            document.body.appendChild(scrollHeader);
        }
        
        window.addEventListener('scroll', () => {
            if(window.scrollY > 120) {
                scrollHeader.classList.add('is-sticky');
            } else {
                scrollHeader.classList.remove('is-sticky');
            }
        });
        
        // Ensure the hamburger button on the scrolled header works
        const mobileMenuBtn = scrollHeader.querySelector('#mobileMenuBtn');
        const overlay = document.getElementById('mobileNavOverlay') || document.getElementById('drawerOverlay');
        const menuCard = document.querySelector('.mobile-menu-card');
        
        if (mobileMenuBtn && overlay && menuCard) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.toggle('is-active'); // Used by some pages
                overlay.classList.toggle('active');    // Used by other pages
                menuCard.classList.toggle('active');
            });
        }
        
        // Ensure the language switch button on the scrolled header works
        const stickyLangBtn = scrollHeader.querySelector('#langSwitch');
        if (stickyLangBtn) {
            stickyLangBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Find all lang switches and click the one that actually has the global event listener (usually the first one or original one)
                // To avoid infinite loop, we won't click ourselves
                const allLangBtns = document.querySelectorAll('#langSwitch, .lang-toggle-btn');
                for (let btn of allLangBtns) {
                    if (btn !== stickyLangBtn) {
                        btn.click();
                        break;
                    }
                }
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
}
});


document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  if(mobileMenuBtn && mobileNavOverlay) {
      mobileMenuBtn.removeAttribute('onclick');
      
      mobileMenuBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          mobileNavOverlay.classList.add('active');
      });
      
      if(mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
        });
      }
      
      mobileNavOverlay.addEventListener('click', (e) => {
          if(e.target === mobileNavOverlay) {
              mobileNavOverlay.classList.remove('active');
          }
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
});

// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}



// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}



  var phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
        window.intlTelInput(input, {
      initialCountry: pk,
      countrySearch: true,
      nationalMode: false,
      autoInsertDialCode: true,
      preferredCountries: ["pk", "sa", "ae", "gb", "us"],
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.4/build/js/utils.js",
      dropdownContainer: document.body
    });
  });

// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}



// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}



  var phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    window.intlTelInput(input, {
      initialCountry: "pk",
      countrySearch: true,
      nationalMode: false,
      autoInsertDialCode: true,
      preferredCountries: ["pk", "sa", "ae", "gb", "us"],
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.4/build/js/utils.js",
      dropdownContainer: document.body
    });
  });

// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}



function obliterateWhiteBar() {
    var h = document.querySelector('.about-minimal-header');
    if (h) {
        var topGap = h.getBoundingClientRect().top;
        if (topGap > 0 && topGap < 100) {
            h.style.marginTop = '-' + topGap + 'px';
            h.style.paddingTop = (20 + topGap) + 'px'; // compensate for text hitting top
        }
    }
}
window.addEventListener('load', obliterateWhiteBar);
window.addEventListener('resize', obliterateWhiteBar);
document.addEventListener('DOMContentLoaded', obliterateWhiteBar);
obliterateWhiteBar();


    document.addEventListener("DOMContentLoaded", () => {
        const navLinks = document.querySelectorAll('.nav-link, .m-link, .mobile-lang-btn');
        const langSwitchBtn = document.getElementById('langSwitch');
        let currentLang = 'en';

        function applyTranslations(lang) {
            document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
            if(langSwitchBtn) langSwitchBtn.textContent = lang === 'ur' ? 'انگلش' : 'URDU';
            
            navLinks.forEach(item => {
                if(item.hasAttribute(`data-${lang}`)) {
                    item.textContent = item.getAttribute(`data-${lang}`);
                }
            });
            
            const brandTitle = document.querySelector('.brand-title');
            if (brandTitle && brandTitle.hasAttribute(`data-${lang}`)) {
                brandTitle.textContent = brandTitle.getAttribute(`data-${lang}`);
            }
            
            // Also translate footer and any other dynamic text elements
            document.querySelectorAll('[data-en]').forEach(item => {
                if (item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') {
                    item.placeholder = item.getAttribute(`data-${lang}`);
                } else if (!item.classList.contains('nav-link') && !item.classList.contains('brand-title')) {
                    item.innerHTML = item.getAttribute(`data-${lang}`);
                }
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
if (langSwitchBtn) {
            langSwitchBtn.addEventListener('click', (e) => {
                // Only scroll to top if it was a real user click
                if(e && e.isTrusted) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }

                // Close mobile menu if open
                const drawer = document.getElementById('mobileDrawer');
                const drawerOverlay = document.getElementById('drawerOverlay');
                if (drawer) drawer.classList.remove('active', 'open');
                if (drawerOverlay) drawerOverlay.classList.remove('active', 'open');
                
                const navOverlay = document.getElementById('mobileNavOverlay');
                if (navOverlay) navOverlay.classList.remove('active', 'open');
                
                // Force clean scroll restoration
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }

                currentLang = currentLang === 'en' ? 'ur' : 'en';
                sessionStorage.setItem('siteLang', currentLang);
                applyTranslations(currentLang);
            });
        }

        // Explicitly set language on load (default to English)
        const savedLang = sessionStorage.getItem('siteLang');
        if (savedLang === 'ur') {
            currentLang = 'ur';
        } else {
            currentLang = 'en';
        }
        applyTranslations(currentLang);

        window.toggleLanguage = function() {
            if (langSwitchBtn) langSwitchBtn.click();
        };

        // --- Mobile Menu Toggle Logic (Drawer) ---
        window.toggleDrawer = function() {
            const drawer = document.getElementById('mobileDrawer');
            const overlay = document.getElementById('mobileNavOverlay') || document.getElementById('drawerOverlay');
            if(drawer) drawer.classList.toggle('active');
            if(overlay) overlay.classList.toggle('active');
        };

        const drawerOverlay = document.getElementById('drawerOverlay');
        if(drawerOverlay) {
            drawerOverlay.addEventListener('click', window.toggleDrawer);
        }
        
        // Close menu when a drawer navigation link is clicked
        const drawerLinks = document.querySelectorAll('.drawer-links-list li a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if(!link.hasAttribute('onclick')) { // Don't close drawer if clicking lang switch which has onclick
                    const drawer = document.getElementById('mobileDrawer');
                    if (drawer && drawer.classList.contains('active')) {
                        window.toggleDrawer();
                    }
                }
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
);
    });



        // --- DYNAMIC SETTINGS LOGIC ---
        function applyDynamicSettings() {
            fetch('https://riaz-ul-quran-wal-sunnah-default-rtdb.firebaseio.com/site_settings.json?nocache=' + new Date().getTime())
                .then(r => r.json())
                .then(s => {
                    if (s) {

                        const form = document.getElementById('madrasaAdmissionForm');
                        const ribbon = document.getElementById('admissions-closed-ribbon');
                        if (form && ribbon) {
                            if (s.admissions_open === false) {
                                ribbon.style.display = 'block';
                                form.style.opacity = '0.5';
                                form.style.pointerEvents = 'none';
                                form.style.userSelect = 'none';
                                const inputs = form.querySelectorAll('input, select, textarea, button');
                                inputs.forEach(el => el.disabled = true);
                            } else {
                                ribbon.style.display = 'none';
                                form.style.opacity = '1';
                                form.style.pointerEvents = 'auto';
                                form.style.userSelect = 'auto';
                                const inputs = form.querySelectorAll('input, select, textarea, button');
                                inputs.forEach(el => el.disabled = false);
                            }
                        }
                        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                        let node;
                        while(node = walker.nextNode()) {
                            if(s.phone && node.nodeValue.includes('+92 300 1234567')) {
                                node.nodeValue = node.nodeValue.replace('+92 300 1234567', s.phone);
                            }
                            if(s.time_morning && (node.nodeValue.includes('08:00 AM - 01:00 PM') || node.nodeValue.includes('08:00 AM - 01:00 PM'))) {
                                node.nodeValue = node.nodeValue.replace('08:00 AM - 01:00 PM', s.time_morning);
                            }
                            if(s.time_evening && (node.nodeValue.includes('Asr to Maghrib') || node.nodeValue.includes('??? ?? ????'))) {
                                node.nodeValue = node.nodeValue.replace('Asr to Maghrib', s.time_evening).replace('??? ?? ????', s.time_evening);
                            }
                        }
                        // Save to localStorage as a cache for next page load speed
                        // Update Links
                        if (s.whatsapp) {
                            let cleanWa = s.whatsapp.replace(/[^0-9]/g, '');
                            document.querySelectorAll('a').forEach(a => {
                                let label = a.getAttribute('aria-label') || '';
                                let title = a.getAttribute('title') || '';
                                if (a.href.includes('wa.me') || label.includes('WhatsApp') || title.includes('WhatsApp') || a.classList.contains('floating-whatsapp')) {
                                    a.href = `https://wa.me/${cleanWa}?text=Assalam-o-Alaikum`;
                                    a.target = '_blank';
                                }
                            });
                        }
                        if (s.phone) {
                            let cleanPhone = s.phone.replace(/[^0-9+]/g, '');
                            document.querySelectorAll('a').forEach(a => {
                                if (a.href.includes('tel:')) {
                                    a.href = `tel:${cleanPhone}`;
                                }
                            });
                        }
                        
                        localStorage.setItem('site_settings', JSON.stringify(s));
                    }
                })
                .catch(e => {
                    // Fallback to localStorage if offline
                    const settingsStr = localStorage.getItem('site_settings');
                    if(settingsStr) {
                        const s = JSON.parse(settingsStr);
                        if (s) {
                            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                            let node;
                            while(node = walker.nextNode()) {
                                if(s.phone && node.nodeValue.includes('+92 300 1234567')) {
                                    node.nodeValue = node.nodeValue.replace('+92 300 1234567', s.phone);
                                }
                                if(s.time_morning && (node.nodeValue.includes('08:00 AM - 01:00 PM') || node.nodeValue.includes('08:00 AM - 01:00 PM'))) {
                                    node.nodeValue = node.nodeValue.replace('08:00 AM - 01:00 PM', s.time_morning);
                                }
                                if(s.time_evening && (node.nodeValue.includes('Asr to Maghrib') || node.nodeValue.includes('??? ?? ????'))) {
                                    node.nodeValue = node.nodeValue.replace('Asr to Maghrib', s.time_evening).replace('??? ?? ????', s.time_evening);
                                }
                            }
                        }
                    }
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
applyDynamicSettings();



function handleFormSubmission(e) {
  e.preventDefault();
  alert("آپ کی درخواست کامیابی سے موصول ہو گئی ہے۔ ادارہ جلد آپ سے رابطہ کرے گا۔\nApplication submitted successfully. We will contact you soon!");
  document.getElementById('madrasaAdmissionForm').reset();
    // Reset Swipe Button
    setTimeout(() => {
      const container = document.getElementById('swipeContainer');
      const btn = document.getElementById('swipeBtn');
      const text = document.getElementById('swipeText');
      const arrow = document.getElementById('swipeArrow');
      const check = document.getElementById('swipeCheck');
      if (container) {
        container.classList.remove('success');
        btn.style.transform = 'translateX(0px)';
        arrow.style.display = 'block';
        check.style.display = 'none';

          
          document.getElementById('photoUploadBox').style.backgroundImage = 'none';
          let urduUploadText = document.documentElement.lang === 'ur' ? "تصویر اپلوڈ کریں" : "Upload Photo";
          document.getElementById('photoUploadBox').innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span class="upload-text" data-en="Upload Photo" data-ur="تصویر اپلوڈ کریں"></span><span style="font-size: 0.65rem; color: #94a3b8; margin-top: 2px; text-align: center; padding: 0 5px;" data-en="(Passport Size 35x45mm)<br>Max 2MB" data-ur="(پاسپورٹ سائز 35x45mm)<br>زیادہ سے زیادہ 2MB"></span>`;

          // update translation manually if needed, but the span has data-ur so global lang toggle will handle it if toggled again.

        let isUrdu = document.documentElement.lang === 'ur';
        text.innerText = isUrdu ? "سوائپ کریں" : "Swipe to Submit";
      }
    }, 2500);

}

// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}



  // Bulletproof Swipe to Submit Logic (Pointer Events)
  (function initSwipeBtn() {
    const container = document.getElementById('swipeContainer');
    const btn = document.getElementById('swipeBtn');
    const text = document.getElementById('swipeText');
    const form = document.getElementById('madrasaAdmissionForm');
    const arrow = document.getElementById('swipeArrow');
    const check = document.getElementById('swipeCheck');
    
    if(!container || !btn) return;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let maxDrag = 0;

    const onPointerDown = (e) => {
      if (container.classList.contains('success')) return;
      isDragging = true;
      startX = e.clientX;
      maxDrag = container.offsetWidth - btn.offsetWidth - 8;
      btn.style.transition = 'none';
      text.style.transition = 'none';
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      
      let dx = e.clientX - startX;
      let isRtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ur';
      
      if (isRtl) {
          currentX = Math.max(-maxDrag, Math.min(0, dx));
      } else {
          currentX = Math.max(0, Math.min(maxDrag, dx));
      }
      
      btn.style.transform = `translateX(${currentX}px)`;
      text.style.opacity = 1 - (Math.abs(currentX) / maxDrag);
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      container.releasePointerCapture(e.pointerId);
      
      btn.style.transition = 'transform 0.3s ease, background-color 0.4s ease';
      text.style.transition = 'opacity 0.3s ease, color 0.4s ease';
      
      let isRtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ur';
      if (Math.abs(currentX) >= maxDrag * 0.85) {
        if (form && typeof form.checkValidity === 'function' && form.checkValidity()) {
          // Success
          btn.style.transform = `translateX(${isRtl ? -maxDrag : maxDrag}px)`;
          container.classList.add('success');
          arrow.style.display = 'none';
          check.style.display = 'block';
          text.style.opacity = 1;
          
          let isUrdu = document.documentElement.lang === 'ur';
          text.innerText = isUrdu ? "کامیابی سے جمع ہو گیا" : "Submitted Successfully";
          
          // Submit the form manually
          setTimeout(() => {
              if (typeof handleFormSubmission === 'function') {
                  handleFormSubmission({ preventDefault: () => {}
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
}, 400); 
        } else {
          // Invalid form
          snapBack();
          if (form.reportValidity) {
              form.reportValidity(); // Show tooltips
          }
        }
      } else {
        snapBack();
      }
    };

    const snapBack = () => {
      currentX = 0;
      btn.style.transform = 'translateX(0px)';
      text.style.opacity = 1;
    };

    // Use Pointer Events for unified mouse/touch handling
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    
    // Prevent default touch behaviors like scrolling on the button
    container.addEventListener('touchstart', (e) => { e.preventDefault(); }, {passive: false});
  })();
  
// Photo preview function
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById('photoUploadBox');
            box.style.backgroundImage = 'url(' + e.target.result + ')';
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            box.innerHTML = ''; // Clear icon and text
        }
        reader.readAsDataURL(file);
    }
}

