
        
        // --- TEACHERS DYNAMIC LOGIC ---
        const defaultTeachers = [
            { id: 1, name_en: 'Qari Muhammad Ahmad', name_ur: 'قاری محمد احمد', role_en: 'Head of Hifz-ul-Quran', role_ur: 'صدر شعبہ حفظ القرآن', image: '' },
            { id: 2, name_en: 'Mufti Abdul Rahman', name_ur: 'مفتی عبدالرحمان', role_en: 'Senior Lecturer (Hadith)', role_ur: 'سینئر استاذ (حدیث)', image: '' },
            { id: 3, name_en: 'Qari Bilal Usmani', name_ur: 'قاری بلال عثمانی', role_en: "Tajweed & Qira'at Specialist", role_ur: 'ماہر تجوید و قراءت', image: '' },
            { id: 4, name_en: 'Maulana Tariq Mahmood', name_ur: 'مولانا طارق محمود', role_en: 'Dars-e-Nizami Faculty', role_ur: 'استاذ درس نظامی', image: '' },
            { id: 5, name_en: 'Qari Zubair Farooq', name_ur: 'قاری زبیر فاروق', role_en: 'Nazra-e-Quran Instructor', role_ur: 'استاذ ناظرہ قرآن', image: '' },
            { id: 6, name_en: 'Maulana Salman Khan', name_ur: 'مولانا سلمان خان', role_en: 'Islamic Jurisprudence', role_ur: 'فقہ اسلامی', image: '' },
            { id: 7, name_en: 'Qari Asim Rasheed', name_ur: 'قاری عاصم رشید', role_en: 'Hifz Department', role_ur: 'شعبہ حفظ', image: '' }
        ];

        
        let siteTeachers = [];

        
        function loadTeachersAdmin() {
            db.ref('site_teachers').once('value').then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    siteTeachers = data;
                } else {
                    siteTeachers = []; // Start completely empty!
                }
                renderTeachersAdmin();
            }).catch((error) => {
                console.error("Firebase load error:", error);
                // Fallback to local storage if offline
                try {
                    const stored = localStorage.getItem('site_teachers');
                    if (stored) {
                        siteTeachers = JSON.parse(stored);
                    } else {
                        siteTeachers = [];
                    }
                } catch(e) {
                    siteTeachers = [];
                }
                renderTeachersAdmin();
            });
        }


        function renderTeachersAdmin() {
            try {
                const container = document.getElementById('teachers-admin-container');
                if (!container) return;
                
                container.innerHTML = '';
                siteTeachers.forEach((teacher, index) => {
                    const card = document.createElement('div');
                    card.className = 'content-card';
                    card.style.marginBottom = '25px';
                    
                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="margin: 0; color: #025F55;">Teacher ${index + 1}</h3>
                            <button type="button" onclick="deleteTeacher(${index})" style="background: #fecaca; color: #b91c1c; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">Delete</button>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr; gap: 15px; margin-bottom: 20px;">
                            <div>
                                <label class="form-label">Upload Image (Square recommended)</label>
                                <input type="file" accept="image/*" class="form-input" style="padding: 9px;" onchange="handleTeacherImage(this, ${index})">
                                ${teacher.image ? `<img src="${teacher.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-top: 10px; border: 2px solid #025F55;">` : `<div style="width: 80px; height: 80px; border-radius: 50%; background: #e2e8f0; margin-top: 10px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 0.8rem;">No Image</div>`}
                            </div>
                        </div>
                        
                        <div class="translation-grid">
                            <!-- English -->
                            <div style="background: rgba(255,255,255,0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
                                <label class="form-label">Name (English)</label>
                                <input type="text" id="teacher-name-en-${index}" class="form-input" value="${teacher.name_en || ''}" placeholder="e.g. Qari Muhammad Ahmad">
                                
                                <label class="form-label">Role (English)</label>
                                <input type="text" id="teacher-role-en-${index}" class="form-input" value="${teacher.role_en || ''}" placeholder="e.g. Head of Hifz-ul-Quran">
                            </div>
                            
                            <!-- Urdu -->
                            <div style="background: rgba(255,255,255,0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
                                <label class="form-label" style="text-align: right; font-family: 'Jameel Noori Nastaleeq', serif; font-size: 22px;">نام</label>
                                <input type="text" id="teacher-name-ur-${index}" class="form-input" value="${teacher.name_ur || ''}" style="font-family: 'Jameel Noori Nastaleeq', serif; font-size: 20px;" placeholder="نام درج کریں...">
                                
                                <label class="form-label" style="text-align: right; font-family: 'Jameel Noori Nastaleeq', serif; font-size: 22px;">عہدہ</label>
                                <input type="text" id="teacher-role-ur-${index}" class="form-input" value="${teacher.role_ur || ''}" style="font-family: 'Jameel Noori Nastaleeq', serif; font-size: 20px;" placeholder="عہدہ درج کریں...">
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } catch(e) {
                console.error("Error rendering teachers:", e);
                alert("Error rendering teachers. Please refresh the page.");
            }
        }


        function handleTeacherImage(input, index) {
            syncTeachersFromDOM(); // Save DOM state before re-rendering!
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    siteTeachers[index].image = e.target.result;
                    renderTeachersAdmin();
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        function addNewTeacher() {
            syncTeachersFromDOM();
            
            siteTeachers.push({
                id: Date.now(),
                name_en: '',
                name_ur: '',
                role_en: '',
                role_ur: '',
                image: ''
            });
            renderTeachersAdmin();
        }
        
        function deleteTeacher(index) {
            if(confirm("Are you sure you want to delete this teacher?")) {
                syncTeachersFromDOM();
                siteTeachers.splice(index, 1);
                renderTeachersAdmin();
            }
        }
        
        function syncTeachersFromDOM() {
            siteTeachers.forEach((t, i) => {
                const nameEn = document.getElementById(`teacher-name-en-${i}`);
                if (nameEn) {
                    t.name_en = nameEn.value;
                    t.name_ur = document.getElementById(`teacher-name-ur-${i}`).value;
                    t.role_en = document.getElementById(`teacher-role-en-${i}`).value;
                    t.role_ur = document.getElementById(`teacher-role-ur-${i}`).value;
                }
            });
        }

        
        
        function saveAllTeachers() {
            try {
                syncTeachersFromDOM();
                
                // Save to localStorage as a backup
                try { localStorage.setItem('site_teachers', JSON.stringify(siteTeachers)); } catch(e){}
                
                // Save to Firebase
                const btn = document.querySelector('.btn-pub-custom .btn-text') || document.querySelector('button[onclick="saveAllTeachers()"]');
                const oldText = btn.innerHTML;
                if(btn) btn.innerHTML = "Saving...";
                
                db.ref('site_teachers').set(siteTeachers)
                  .then(() => {
                      if(btn) btn.innerHTML = oldText;
                      alert("All teachers saved to LIVE DATABASE successfully! Changes are now visible to everyone worldwide.");
                  })
                  .catch((error) => {
                      if(btn) btn.innerHTML = oldText;
                      alert("ERROR saving to Firebase: " + error.message);
                  });
            } catch (e) {
                alert("ERROR: " + e.message);
            }
        }



        // --- 1. AUTHENTICATION LOGIC ---
        const loginView = document.getElementById('login-view');
        const dashView = document.getElementById('dashboard-view');
        
        function checkAuth() {
            if(sessionStorage.getItem('admin_auth') === 'true') {
                loginView.style.display = 'none';
                dashView.style.display = 'block';
                loadCardsIntoForms();
            loadTeachersAdmin();
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
            while(u.length < 6) {
                u.push({ id: Date.now() + u.length, date: new Date().toISOString().split('T')[0], cat: 'General', author: 'Admin', title_en: '', desc_en: '', title_ur: '', desc_ur: '', image: null });
            }
            return u;
        }

        
    if(!localStorage.getItem('admin_wipe_v2')) {
        localStorage.removeItem('site_updates');
        localStorage.setItem('admin_wipe_v2', 'true');
    }

    function loadCardsIntoForms() {
            const updates = getUpdates();
            for(let i=0; i<6; i++) {
                if(updates[i]) {
                    document.getElementById(`c${i}-date`).value = updates[i].date;
                    document.getElementById(`c${i}-author`).value = updates[i].author || 'Admin';
                    document.getElementById(`c${i}-cat`).value = updates[i].cat || 'General';
                    document.getElementById(`c${i}-title`).value = updates[i].title_en || '';
                    document.getElementById(`c${i}-desc`).value = updates[i].desc_en || '';
                    document.getElementById(`c${i}-title-ur`).value = updates[i].title_ur || '';
                    document.getElementById(`c${i}-desc-ur`).value = updates[i].desc_ur || '';
                } else {
                    document.getElementById(`c${i}-date`).valueAsDate = new Date();
                }
            }
        }

        
        window.deleteCard = function(index) {
            if(!confirm(`Are you sure you want to delete Card ${index + 1}? It will be removed from the website.`)) return;
            
            // Empty the form fields
            document.getElementById(`c${index}-title`).value = '';
            document.getElementById(`c${index}-desc`).value = '';
            document.getElementById(`c${index}-title-ur`).value = '';
            document.getElementById(`c${index}-desc-ur`).value = '';
            document.getElementById(`c${index}-author`).value = 'Admin';
            document.getElementById(`c${index}-cat`).value = 'General';
            document.getElementById(`c${index}-image`).value = '';
            
            // Empty the data in localStorage
            let updatesStr = localStorage.getItem('site_updates') || '[]';
            let updates = JSON.parse(updatesStr);
            if(updates.length < 6) {
                while(updates.length < 6) updates.push({ id: Date.now() + updates.length, date: new Date().toISOString().split('T')[0], cat: 'General', author: 'Admin', title_en: '', desc_en: '', title_ur: '', desc_ur: '', image: null });
            }
            updates[index].title_en = '';
            updates[index].desc_en = '';
            updates[index].title_ur = '';
            updates[index].desc_ur = '';
            updates[index].image = null;
            updates[index].author = 'Admin';
            updates[index].date = new Date().toISOString().split('T')[0];
            
            localStorage.setItem('site_updates', JSON.stringify(updates));
            sessionStorage.setItem('site_updates', JSON.stringify(updates));
            
            alert(`Card ${index + 1} has been deleted.`);
        }
        
        window.autoTranslate = async function(index) {
            const btn = document.getElementById(`btn-trans-${index}`);
            const titleEn = document.getElementById(`c${index}-title`).value;
            const descEn = document.getElementById(`c${index}-desc`).value;
            
            if(!titleEn && !descEn) {
                alert("Please enter English text first.");
                return;
            }
            
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Translating...';
            try {
                if(titleEn) {
                    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(titleEn)}`);
                    const data = await res.json();
                    document.getElementById(`c${index}-title-ur`).value = data[0].map(x => x[0]).join('');
                }
                if(descEn) {
                    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(descEn)}`);
                    const data = await res.json();
                    document.getElementById(`c${index}-desc-ur`).value = data[0].map(x => x[0]).join('');
                }
            } catch(e) {
                alert("Translation failed. You can type manually.");
            }
            btn.innerHTML = originalText;
        }

        window.publishCard = async function(index) {
            const pubTextSpan = document.getElementById(`pub-text-${index}`);
            if(pubTextSpan) pubTextSpan.innerText = 'Saving...';
            
            const titleEn = document.getElementById(`c${index}-title`).value;
            const descEn = document.getElementById(`c${index}-desc`).value;
            const titleUr = document.getElementById(`c${index}-title-ur`).value;
            const descUr = document.getElementById(`c${index}-desc-ur`).value;
            const fileInput = document.getElementById(`c${index}-image`);
            
            if(!titleEn && !titleUr) {
                alert("Please enter a title.");
                if(pubTextSpan) pubTextSpan.innerText = 'Publish Updates';
                return;
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
                    image: imgData || updates[index].image
                };
                
                localStorage.setItem('site_updates', JSON.stringify(updates));
                sessionStorage.setItem('site_updates', JSON.stringify(updates));
                
                // Also trigger storage event for other tabs
                window.dispatchEvent(new Event('storage'));
                
                if(pubTextSpan) pubTextSpan.innerText = 'Publish Updates';
                alert(`Card ${index + 1} published successfully!`);
            };

            if (fileInput && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    finalizePublish(e.target.result);
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                finalizePublish(null);
            }
        }
        
        window.deleteCard = function(index) {
            if(!confirm(`Are you sure you want to delete Card ${index + 1}? It will be removed from the website.`)) return;
            
            // Empty the form fields
            document.getElementById(`c${index}-title`).value = '';
            document.getElementById(`c${index}-desc`).value = '';
            document.getElementById(`c${index}-title-ur`).value = '';
            document.getElementById(`c${index}-desc-ur`).value = '';
            document.getElementById(`c${index}-author`).value = 'Admin';
            document.getElementById(`c${index}-cat`).value = 'General';
            document.getElementById(`c${index}-image`).value = '';
            
            // Empty the data in localStorage
            let updatesStr = localStorage.getItem('site_updates') || '[]';
            let updates = JSON.parse(updatesStr);
            if(updates.length < 6) {
                while(updates.length < 6) updates.push({ id: Date.now() + updates.length, date: new Date().toISOString().split('T')[0], cat: 'General', author: 'Admin', title_en: '', desc_en: '', title_ur: '', desc_ur: '', image: null });
            }
            updates[index].title_en = '';
            updates[index].desc_en = '';
            updates[index].title_ur = '';
            updates[index].desc_ur = '';
            updates[index].image = null;
            updates[index].author = 'Admin';
            updates[index].date = new Date().toISOString().split('T')[0];
            
            localStorage.setItem('site_updates', JSON.stringify(updates));
            sessionStorage.setItem('site_updates', JSON.stringify(updates));
            
            alert(`Card ${index + 1} has been deleted.`);
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
        
    