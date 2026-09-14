
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

