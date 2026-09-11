
        // --- 1. AUTHENTICATION LOGIC ---
        const loginView = document.getElementById('login-view');
        const dashView = document.getElementById('dashboard-view');
        
        function checkAuth() {
            if(sessionStorage.getItem('admin_auth') === 'true') {
                loginView.style.display = 'none';
                dashView.style.display = 'block';
                loadCardsIntoForms();
                renderAdmissionsTable();
                renderDonationsTable();
            } else {
                loginView.style.display = 'flex';
                dashView.style.display = 'none';
            }
        }
        
        document.getElementById('btn-login').addEventListener('click', () => {
            const u = document.getElementById('login-user').value.trim().toLowerCase();
            const p = document.getElementById('login-pass').value.trim();
            if(u === 'admin' && p === 'admin123') {
                sessionStorage.setItem('admin_auth', 'true');
                checkAuth();
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        });
        
        // Allow pressing Enter to login
        document.getElementById('login-pass').addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                document.getElementById('btn-login').click();
            }
        });
        document.getElementById('login-user').addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                document.getElementById('btn-login').click();
            }
        });
        
        document.getElementById('btn-logout').addEventListener('click', () => {
            sessionStorage.removeItem('admin_auth');
            checkAuth();
        });

        // Initialize today's date
        // document.getElementById('upd-date').valueAsDate = new Date();

        // --- 2. TAB NAVIGATION ---
        document.querySelectorAll('.admin-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
                
                btn.classList.add('active');
                document.getElementById(btn.getAttribute('data-target')).style.display = 'block';
            });
        });

        // --- 3. CARD MANAGEMENT LOGIC ---
        // Initialize default empty cards if not present
        function getUpdates() {
            let u = JSON.parse(localStorage.getItem('site_updates') || '[]');
            while(u.length < 3) {
                u.push({ id: Date.now() + u.length, date: new Date().toISOString().split('T')[0], cat: 'General', author: 'Admin', title_en: '', desc_en: '', title_ur: '', desc_ur: '', image: null });
            }
            return u;
        }

        function loadCardsIntoForms() {
            const updates = getUpdates();
            for(let i=0; i<3; i++) {
                if(updates[i]) {
                    document.getElementById(`c${i}-date`).value = updates[i].date;
                    document.getElementById(`c${i}-author`).value = updates[i].author || 'Admin';
                    document.getElementById(`c${i}-cat`).value = updates[i].cat || 'General';
                    document.getElementById(`c${i}-title`).value = updates[i].title_en || '';
                    document.getElementById(`c${i}-desc`).value = updates[i].desc_en || '';
                } else {
                    document.getElementById(`c${i}-date`).valueAsDate = new Date();
                }
            }
        }

        window.publishCard = async function(index) {
            const btn = document.getElementById(`btn-pub-${index}`);
            btn.innerHTML = 'Translating & Saving...';
            
            const titleEn = document.getElementById(`c${index}-title`).value;
            const descEn = document.getElementById(`c${index}-desc`).value;
            const fileInput = document.getElementById(`c${index}-image`);
            
            if(!titleEn) {
                alert("Please enter at least an English title!");
                btn.innerHTML = 'Auto-Translate to Urdu & Publish';
                return;
            }
            
            let titleUr = '';
            let descUr = '';
            
            try {
                // Try Google Translate first
                if(titleEn) {
                    const resT = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(titleEn)}`);
                    if (!resT.ok) throw new Error('Google 429');
                    const dataT = await resT.json();
                    titleUr = dataT[0].map(x => x[0]).join('');
                }
                if(descEn) {
                    const resD = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(descEn)}`);
                    if (!resD.ok) throw new Error('Google 429');
                    const dataD = await resD.json();
                    descUr = dataD[0].map(x => x[0]).join('');
                }
            } catch(e) {
                console.warn("Google Translate failed, trying MyMemory...", e);
                try {
                    // Fallback to MyMemory Translate API
                    if(titleEn) {
                        const resT = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(titleEn)}&langpair=en|ur`);
                        const dataT = await resT.json();
                        titleUr = dataT.responseData.translatedText;
                    }
                    if(descEn) {
                        const resD = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(descEn)}&langpair=en|ur`);
                        const dataD = await resD.json();
                        descUr = dataD.responseData.translatedText;
                    }
                } catch(e2) {
                    console.warn("MyMemory failed too.", e2);
                    alert("Auto-translation services are currently busy. Saving English text in Urdu version as fallback.");
                    titleUr = titleEn;
                    descUr = descEn;
                }
            }
            
            const updates = getUpdates();
            
            const finalizePublish = (imgData) => {
                updates[index] = {
                    id: updates[index].id || Date.now(),
                    date: document.getElementById(`c${index}-date`).value,
                    author: document.getElementById(`c${index}-author`).value,
                    cat: document.getElementById(`c${index}-cat`).value,
                    title_en: titleEn,
                    desc_en: descEn,
                    title_ur: titleUr,
                    desc_ur: descUr,
                    image: imgData || updates[index].image // Keep old image if no new one uploaded
                };
                
                localStorage.setItem('site_updates', JSON.stringify(updates));
                btn.innerHTML = 'Auto-Translate to Urdu & Publish';
                alert(`Card ${index + 1} updated and translated successfully!`);
            };
            
            if(fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => finalizePublish(e.target.result);
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                finalizePublish(null);
            }
        };
        
        // --- Dummy Tables for Admissions/Donations ---
        function renderAdmissionsTable() {
            const tbody = document.getElementById('admissions-table-body');
            if(!tbody) return;
            tbody.innerHTML = `
                <tr><td>2026-09-11</td><td>Ahmed Khan</td><td>0300-1122334</td><td>Hifz ul Quran</td><td><span class="status-badge status-pending" onclick="toggleStatus(this)">Pending</span></td></tr>
                <tr><td>2026-09-10</td><td>Usman Ali</td><td>0321-9988776</td><td>Nazra</td><td><span class="status-badge status-approved" onclick="toggleStatus(this)">Approved</span></td></tr>
            `;
        }
        function renderDonationsTable() {
            const tbody = document.getElementById('donations-table-body');
            if(!tbody) return;
            tbody.innerHTML = `
                <tr><td>2026-09-11</td><td>Anonymous</td><td>Rs. 50,000</td><td>TRX-987123</td><td><span class="status-badge status-pending" onclick="toggleStatus(this)">Unverified</span></td></tr>
                <tr><td>2026-09-08</td><td>Zaid Umar</td><td>Rs. 10,000</td><td>SLIP-091</td><td><span class="status-badge status-approved" onclick="toggleStatus(this)">Verified</span></td></tr>
            `;
        }

        window.toggleStatus = function(el) {
            if(el.classList.contains('status-pending')) {
                el.className = 'status-badge status-approved';
                el.innerText = 'Approved';
            } else if(el.classList.contains('status-approved')) {
                el.className = 'status-badge status-rejected';
                el.innerText = 'Rejected';
            } else {
                el.className = 'status-badge status-pending';
                el.innerText = 'Pending';
            }
        };

        // Initialize Auth State on load
        checkAuth();

        // Include translation script logic similar to index.html
        let currentLang = 'en';
        const langSwitchBtn = document.getElementById('lang-switch');
        
        function applyTranslations(lang) {
            document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
            if(langSwitchBtn) langSwitchBtn.textContent = lang === 'ur' ? 'انگلش' : 'URDU';
            
            document.querySelectorAll('[data-en]').forEach(item => {
                if (item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') {
                    item.placeholder = item.getAttribute(`data-${lang}`);
                } else if (!item.classList.contains('admin-tab')) {
                    item.innerHTML = item.getAttribute(`data-${lang}`);
                } else {
                    item.textContent = item.getAttribute(`data-${lang}`);
                }
            });
            
            // Adjust tables text-align for RTL
            document.querySelectorAll('.admin-table th, .admin-table td').forEach(td => {
                td.style.textAlign = lang === 'ur' ? 'right' : 'left';
            });
        }
        
        langSwitchBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ur' : 'en';
            applyTranslations(currentLang);
        });
        
    