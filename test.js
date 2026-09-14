
        
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
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 300;
                        const MAX_HEIGHT = 300;
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6); // 60% quality JPEG
                        
                        siteTeachers[index].image = compressedBase64;
                        renderTeachersAdmin();
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
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
            setTimeout(() => applyDynamicSettings(), 50);
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
            const btn = document.getElementById(`btn-pub-${index}`);
            const originalHTML = btn.innerHTML;
            const textSpan = document.getElementById(`pub-text-${index}`);
            if(textSpan) textSpan.innerText = 'Saving...';
            
            const titleEn = document.getElementById(`c${index}-title`).value;
            const descEn = document.getElementById(`c${index}-desc`).value;
            let titleUr = document.getElementById(`c${index}-title-ur`).value;
            let descUr = document.getElementById(`c${index}-desc-ur`).value;
            const fileInput = document.getElementById(`c${index}-image`);
            
            if(!titleEn && !titleUr) {
                alert("Please enter a title.");
                btn.innerHTML = originalHTML;
                return;
            }
            
            // Auto translate if UR is empty
            if (titleEn && !titleUr) {
                if(textSpan) textSpan.innerText = 'Translating...';
                try {
                    const resT = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(titleEn)}`);
                    const dataT = await resT.json();
                    titleUr = dataT[0].map(x => x[0]).join('');
                    document.getElementById(`c${index}-title-ur`).value = titleUr;
                } catch(e) {}
            }
            if (descEn && !descUr) {
                if(textSpan) textSpan.innerText = 'Translating...';
                try {
                    const resD = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(descEn)}`);
                    const dataD = await resD.json();
                    descUr = dataD[0].map(x => x[0]).join('');
                    document.getElementById(`c${index}-desc-ur`).value = descUr;
                } catch(e) {}
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
                
                // Save to Firebase
                if(textSpan) textSpan.innerText = 'Publishing to DB...';
                db.ref('site_updates').set(updates)
                  .then(() => {
                      btn.innerHTML = originalHTML;
                      alert(`Update published to LIVE DATABASE successfully!`);
                  })
                  .catch((error) => {
                      btn.innerHTML = originalHTML;
                      alert("ERROR publishing to Firebase: " + error.message);
                  });
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
            
            document.getElementById(`c${index}-title`).value = '';
            document.getElementById(`c${index}-desc`).value = '';
            document.getElementById(`c${index}-title-ur`).value = '';
            document.getElementById(`c${index}-desc-ur`).value = '';
            document.getElementById(`c${index}-author`).value = 'Admin';
            document.getElementById(`c${index}-cat`).value = 'General';
            document.getElementById(`c${index}-image`).value = '';
            
            let updates = getUpdates();
            updates[index] = { id: Date.now() + index, date: new Date().toISOString().split('T')[0], cat: 'General', author: 'Admin', title_en: '', desc_en: '', title_ur: '', desc_ur: '', image: null };
            
            db.ref('site_updates').set(updates)
              .then(() => alert(`Update ${index + 1} deleted from Live DB.`))
              .catch(e => alert("Error deleting: " + e.message));
        }

        // LOAD UPDATES FROM FIREBASE INSTEAD OF LOCALSTORAGE
        function getUpdates() {
            let updatesStr = localStorage.getItem('site_updates') || '[]';
            return JSON.parse(updatesStr);
        }
        
        db.ref('site_updates').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                localStorage.setItem('site_updates', JSON.stringify(data));
                // Only populate the form if we are on the updates page (could refresh UI)
                let currentUpdates = getUpdates();
                currentUpdates.forEach((up, idx) => {
                    const elTitle = document.getElementById(`c${idx}-title`);
                    if(elTitle && elTitle.value === '') {
                        document.getElementById(`c${idx}-title`).value = up.title_en || '';
                        document.getElementById(`c${idx}-desc`).value = up.desc_en || '';
                        document.getElementById(`c${idx}-title-ur`).value = up.title_ur || '';
                        document.getElementById(`c${idx}-desc-ur`).value = up.desc_ur || '';
                    }
            });
            setTimeout(() => applyDynamicSettings(), 50);
        }
});

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
        
        if(langSwitchBtn) langSwitchBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ur' : 'en';
            applyTranslations(currentLang);
        });
        
    
        // --- SITE SETTINGS LOGIC ---
        db.ref('site_settings').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                if(document.getElementById('set-phone')) document.getElementById('set-phone').value = data.phone || '';
                if(document.getElementById('set-whatsapp')) document.getElementById('set-whatsapp').value = data.whatsapp || '';
                if(document.getElementById('set-time-morning')) document.getElementById('set-time-morning').value = data.time_morning || '08:00 AM - 01:00 PM';
                if(document.getElementById('set-time-evening')) document.getElementById('set-time-evening').value = data.time_evening || 'Asr to Maghrib';
            }
        });

        document.getElementById('btn-save-settings').addEventListener('click', () => {
            const btn = document.getElementById('btn-save-settings');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Saving...';
            
            const settings = {
                phone: document.getElementById('set-phone').value,
                whatsapp: document.getElementById('set-whatsapp').value,
                time_morning: document.getElementById('set-time-morning').value,
                time_evening: document.getElementById('set-time-evening').value
            };
            
            db.ref('site_settings').set(settings)
              .then(() => {
                  btn.innerHTML = 'Saved Successfully!';
                  setTimeout(() => btn.innerHTML = originalText, 2000);
              })
              .catch((e) => {
                  btn.innerHTML = originalText;
                  alert("Error saving settings: " + e.message);
              });
        });

