import re

def fix_index():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    # Find the closing </script> right before </body> or inside the main script block
    # We will inject a fetch for site_updates right next to the site_settings fetch.
    
    fetch_code = """
        // Fetch updates from Firebase
        fetch('https://riaz-ul-quran-wal-sunnah-default-rtdb.firebaseio.com/site_updates.json?nocache=' + new Date().getTime())
            .then(r => r.json())
            .then(updates => {
                if (updates && Array.isArray(updates)) {
                    localStorage.setItem('site_updates', JSON.stringify(updates));
                    const currentLang = localStorage.getItem('site_lang') || 'en';
                    if(typeof renderUpdatesForLang === 'function') {
                        renderUpdatesForLang(currentLang);
                    }
                }
            })
            .catch(e => console.error('Failed to fetch updates from Firebase', e));
    """
    
    if "fetch('https://riaz-ul-quran-wal-sunnah-default-rtdb.firebaseio.com/site_updates.json" not in html:
        html = html.replace("applyDynamicSettings();", "applyDynamicSettings();\n" + fetch_code)
        
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Fixed index.html")


def fix_updates():
    with open("updates.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    script_code = """
<script>
document.addEventListener("DOMContentLoaded", () => {
    function renderUpdatesForLang(lang) {
        const grid = document.getElementById('dynamic-updates-container');
        if(!grid) return;
        
        const updatesStr = localStorage.getItem('site_updates');
        if(!updatesStr) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No updates available.</p>';
            return;
        }
        
        const updates = JSON.parse(updatesStr);
        const validUpdates = updates.filter(u => u.title_en && u.title_en.trim() !== "");
        
        if(validUpdates.length === 0) {
            const emptyText = lang === 'ur' ? '\u0641\u06cc\u0020\u0627\u0644\u062d\u0627\u0644\u0020\u06a9\u0648\u0626\u06cc\u0020\u0646\u0626\u06cc\u0020\u0627\u067e\u0688\u06cc\u0679\u0020\u0645\u0648\u062c\u0648\u062f\u0020\u0646\u06c1\u06cc\u06ba\u0020\u06c1\u06d2\u06d4' : 'Currently, there are no new updates or announcements to display.';
            const emptyFont = lang === 'ur' ? "'Jameel Noori Nastaleeq', serif" : "'Plus Jakarta Sans', sans-serif";
            const emptySize = lang === 'ur' ? "1.5rem" : "1.1rem";
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.4); border-radius: 20px; border: 2px dashed #e2e8f0; margin-top: 10px;"><p style="color: #64748b; font-size: ${emptySize}; font-family: ${emptyFont}; font-weight: 500; margin: 0;">${emptyText}</p></div>`;
            return;
        }
        
        // ADDED TO FIX GRID STYLING
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        grid.style.gap = '25px';
        
        grid.innerHTML = validUpdates.map((u, i) => {
            const title = lang === 'ur' ? u.title_ur : u.title_en;
            const desc = lang === 'ur' ? u.desc_ur : u.desc_en;
            
            const dateObj = new Date(u.date);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const year = dateObj.getFullYear();
            const formattedDate = `${day} ${month}, ${year}`;
            
            const arrow = lang === 'ur' ? '&larr;' : '&rarr;';
            const readMore = lang === 'ur' ? `\u0645\u0632\u06cc\u062f \u067e\u0691\u06be\u06cc\u06ba <span>${arrow}</span>` : `READ MORE <span>${arrow}</span>`;
            
            const imgSrc = u.image ? u.image : 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E';
            
            const authorName = u.author ? u.author : 'Admin';
            const finalAuthor = lang === 'ur' ? `&bull; \u0627\u0632 \u0637\u0631\u0641 ${authorName}` : `&bull; by ${authorName}`;
            
            const titleFont = lang === 'ur' ? "'Jameel Noori Nastaleeq', serif" : "'Plus Jakarta Sans', sans-serif";
            const descFont = lang === 'ur' ? "'Jameel Noori Nastaleeq', serif" : "'Plus Jakarta Sans', sans-serif";
            const descSize = lang === 'ur' ? '20px' : '15px';
            
            return `
            <article class="news-card" id="upd-${u.id}">
                <div class="news-img-wrapper">
                    <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 250px; object-fit: cover;" />
                </div>
                <div class="news-card-content">
                    <div class="news-meta">
                        <span class="news-date-badge">${formattedDate}</span>
                        <span class="news-author">${finalAuthor}</span>
                    </div>
                    <h3 class="news-heading" style="word-break: break-word; overflow-wrap: break-word; font-family: ${titleFont}; margin-bottom:15px;">${title}</h3>
                    <p class="news-excerpt" style="word-break: break-word; overflow-wrap: break-word; font-family: ${descFont}; font-size: ${descSize};">${desc}</p>
                </div>
            </article>`;
        }).join('');
    }

    // Export globally so lang switcher can call it
    window.renderUpdatesForLang = renderUpdatesForLang;
    
    // Initial render from cache
    const currentLang = localStorage.getItem('site_lang') || 'en';
    renderUpdatesForLang(currentLang);
    
    // Fetch fresh from Firebase
    fetch('https://riaz-ul-quran-wal-sunnah-default-rtdb.firebaseio.com/site_updates.json?nocache=' + new Date().getTime())
        .then(r => r.json())
        .then(updates => {
            if (updates && Array.isArray(updates)) {
                localStorage.setItem('site_updates', JSON.stringify(updates));
                renderUpdatesForLang(localStorage.getItem('site_lang') || 'en');
            }
        })
        .catch(e => console.error('Failed to fetch updates from Firebase', e));
});
</script>
"""
    if "window.renderUpdatesForLang = renderUpdatesForLang;" not in html:
        html = html.replace("</body>", script_code + "\n</body>")
        with open("updates.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Fixed updates.html")

fix_index()
fix_updates()
