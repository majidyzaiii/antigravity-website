/**
 * Madrassa Riaz ul Quran wal Sunnah (MRQS)
 * Form Submission & Delivery Handler via Google Apps Script Web App
 * Destination Email: info@mrqs.pk (routed to mrqs.pk@gmail.com)
 * Endpoint: https://script.google.com/macros/s/AKfycbyQ1Bdt4rJZhOkIkT730bVAc1LWkwEMOOce7gEINdLi5R3pRe3FI4lnZLHd0j0BRwBi/exec
 */

// ========================================================
// 1. CONFIGURATION
// Active Verified Google Apps Script Web App Endpoint:
// ========================================================
window.MRQS_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQ1Bdt4rJZhOkIkT730bVAc1LWkwEMOOce7gEINdLi5R3pRe3FI4lnZLHd0j0BRwBi/exec";
window.MRQS_WEB3FORMS_ACCESS_KEY = "058abb09-aa64-4406-bc9d-c236026b80b5";

(function() {
  // Inject Universal Toast Notification Styles
  if (!document.getElementById('mrqs-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'mrqs-toast-styles';
    style.textContent = `
      .mrqs-toast-container {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 440px;
        width: calc(100% - 48px);
        pointer-events: none;
      }
      html[dir="rtl"] .mrqs-toast-container,
      body.ur .mrqs-toast-container {
        right: auto;
        left: 24px;
      }
      .mrqs-toast {
        pointer-events: auto;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 16px 20px;
        border-radius: 12px;
        font-family: inherit;
        font-size: 0.95rem;
        line-height: 1.5;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .mrqs-toast.show {
        transform: translateY(0);
        opacity: 1;
      }
      .mrqs-toast.toast-success {
        background: #004D44;
        color: #ffffff;
        border-left: 5px solid #10b981;
      }
      .mrqs-toast.toast-error {
        background: #1e293b;
        color: #ffffff;
        border-left: 5px solid #ef4444;
      }
      .mrqs-toast.toast-warning {
        background: #1e293b;
        color: #ffffff;
        border-left: 5px solid #f59e0b;
      }
      .mrqs-toast.toast-info {
        background: #004D44;
        color: #ffffff;
        border-left: 5px solid #38bdf8;
      }
      html[dir="rtl"] .mrqs-toast.toast-success,
      body.ur .mrqs-toast.toast-success {
        border-left: none;
        border-right: 5px solid #10b981;
      }
      html[dir="rtl"] .mrqs-toast.toast-error,
      body.ur .mrqs-toast.toast-error {
        border-left: none;
        border-right: 5px solid #ef4444;
      }
      html[dir="rtl"] .mrqs-toast.toast-warning,
      body.ur .mrqs-toast.toast-warning {
        border-left: none;
        border-right: 5px solid #f59e0b;
      }
      html[dir="rtl"] .mrqs-toast.toast-info,
      body.ur .mrqs-toast.toast-info {
        border-left: none;
        border-right: 5px solid #38bdf8;
      }
      .mrqs-toast-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        margin-top: 1px;
      }
      .mrqs-toast-body {
        flex-grow: 1;
      }
      .mrqs-toast-title {
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 2px;
      }
      .mrqs-toast-msg {
        font-size: 0.88rem;
        opacity: 0.92;
      }
      .mrqs-toast-close {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        padding: 0 4px;
        margin-top: -2px;
        transition: color 0.2s;
      }
      .mrqs-toast-close:hover {
        color: #ffffff;
      }
      @media (max-width: 600px) {
        .mrqs-toast-container {
          top: 16px;
          right: 16px;
          left: 16px;
          width: auto;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Toast Notification Function
  window.showMrqsToast = function(title, message, type = 'success', duration = 6000) {
    let container = document.querySelector('.mrqs-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'mrqs-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `mrqs-toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="mrqs-toast-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="mrqs-toast-icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else if (type === 'info') {
      iconSvg = '<svg class="mrqs-toast-icon" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    } else {
      iconSvg = '<svg class="mrqs-toast-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="mrqs-toast-body">
        <div class="mrqs-toast-title">${title}</div>
        <div class="mrqs-toast-msg">${message}</div>
      </div>
      <button class="mrqs-toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    const closeBtn = toast.querySelector('.mrqs-toast-close');
    const removeToast = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    };

    closeBtn.addEventListener('click', removeToast);
    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  };

  /**
   * Converts a Blob or File to Base64 Data URL string
   * @param {Blob|File} blob 
   * @returns {Promise<string|null>}
   */
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      if (!blob) return resolve(null);
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Generates a visual PNG snapshot Blob of a form / container element using html2canvas
   * @param {HTMLElement} element - Target form or container element
   * @returns {Promise<Blob|null>}
   */
  async function generateVisualSnapshotBlob(element) {
    if (typeof html2canvas !== 'function' || !element) {
      return null;
    }
    try {
      // Temporarily hide swipe-to-submit track from the snapshot receipt for an official, clean look
      const submitControls = element.querySelectorAll('.swipe-submit-track, .swipe-container, #swipeContainer, .submit-btn-row');
      const hiddenDisplays = [];
      submitControls.forEach((ctrl, i) => {
        hiddenDisplays[i] = ctrl.style.display;
        ctrl.style.display = 'none';
      });

      const canvas = await html2canvas(element, {
        scale: 2, // High resolution crisp image
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // Explicitly clone current user inputs, selects, and textareas into the cloned DOM
          const origInputs = element.querySelectorAll('input, select, textarea');
          const clonedInputs = clonedDoc.querySelectorAll('input, select, textarea');
          origInputs.forEach((orig, idx) => {
            const cloned = clonedInputs[idx];
            if (!cloned) return;
            if (orig.tagName === 'SELECT') {
              cloned.value = orig.value;
            } else if (orig.type === 'checkbox' || orig.type === 'radio') {
              cloned.checked = orig.checked;
              if (orig.checked) cloned.setAttribute('checked', 'checked');
            } else {
              cloned.value = orig.value;
              cloned.setAttribute('value', orig.value);
            }
          });
        }
      });

      // Restore submit controls
      submitControls.forEach((ctrl, i) => {
        ctrl.style.display = hiddenDisplays[i] || '';
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 0.95);
      });
    } catch (err) {
      console.warn('MRQS Snapshot Error (html2canvas):', err);
      return null;
    }
  }

  /**
   * Main Form Submission Handler via Google Apps Script Web App
   * @param {HTMLFormElement} form - Form element to submit
   * @param {string} formType - 'contact' | 'donation' | 'admission'
   * @param {object} callbacks - { onStart, onSuccess, onError }
   */
  window.submitMrqsForm = async function(form, formType, callbacks = {}) {
    const isUrdu = document.documentElement.lang === 'ur' || document.documentElement.dir === 'rtl';

    // 1. Validation check
    if (form.reportValidity && !form.reportValidity()) {
      if (callbacks.onError) callbacks.onError({ message: 'Validation failed' });
      return;
    }

    // 2. Loading state trigger
    if (callbacks.onStart) callbacks.onStart();

    // 3. Resolve Target Endpoint URL
    const APPS_SCRIPT_URL = window.MRQS_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyQ1Bdt4rJZhOkIkT730bVAc1LWkwEMOOce7gEINdLi5R3pRe3FI4lnZLHd0j0BRwBi/exec";

    // 4. Generate Visual Snapshot (PNG Image Blob)
    let snapshotTarget = form;
    if (formType === 'admission') {
      snapshotTarget = form.closest('.online-admission-form-container') || form;
    } else if (formType === 'donation' || formType === 'contact') {
      snapshotTarget = form.closest('.floating-form-card') || form;
    }

    let snapshotBlob = null;
    let base64Snapshot = null;
    try {
      snapshotBlob = await generateVisualSnapshotBlob(snapshotTarget);
      if (snapshotBlob) {
        base64Snapshot = await blobToBase64(snapshotBlob);
      }
    } catch (e) {
      console.warn('MRQS Warning: Error during visual snapshot generation:', e);
    }

    // 5. Build FormData and Structured JSON Payload for Apps Script
    const formData = new FormData(form);

    // Form Type resolution
    let form_type = form.dataset.formType;
    if (!form_type) {
      if (formType === 'admission') {
        form_type = 'Online Admission Application';
      } else if (formType === 'donation') {
        form_type = 'Donation Intimation Receipt';
      } else {
        form_type = 'Contact Message';
      }
    }

    // Student / Donor / Sender name resolution
    let studentName = 'Applicant';
    if (formType === 'admission') {
      const fName = (formData.get('studentFirstName') || '').trim();
      const lName = (formData.get('studentLastName') || '').trim();
      studentName = (fName + ' ' + lName).trim() || formData.get('name') || 'Applicant';
    } else if (formType === 'donation') {
      studentName = (formData.get('Donor Full Name') || formData.get('name') || 'Donor').trim();
    } else {
      const fName = (formData.get('First Name') || '').trim();
      const lName = (formData.get('Last Name') || '').trim();
      studentName = (fName + ' ' + lName).trim() || formData.get('name') || 'Website Visitor';
    }

    const payload = {
      form_type: form_type,
      studentName: studentName,
      fields: {}
    };

    // Dictionary of human-readable labels for email template table
    const fieldLabels = {
      studentFirstName: "First Name",
      studentLastName: "Last Name",
      programSelection: "Desired Program",
      studentDob: "Date of Birth",
      studentBForm: "Candidate B-Form / CNIC",
      studentNationality: "Nationality",
      prevEducation: "Previous Education",
      prevSchool: "Previous School",
      fatherNameEn: "Father's Name (Capital Letters)",
      fatherOccupation: "Father's Occupation",
      guardianName: "Guardian's Name",
      guardianRelation: "Relation with Candidate",
      guardianCnic: "Guardian CNIC No",
      mobile1: "Mobile Number 1",
      mobile2: "Mobile Number 2",
      whatsappNo: "WhatsApp Number",
      tempAddress: "Current / Temporary Address",
      permAddress: "Permanent Address",
      undertakingCheck1: "Guardian Undertaking",
      undertakingCheck2: "Rules & Regulations",
      'First Name': "First Name",
      'Last Name': "Last Name",
      'Email': "Email Address",
      'Phone Number': "Phone / Mobile",
      'Message': "Message",
      'Donor Full Name': "Donor Full Name",
      'WhatsApp Number': "WhatsApp Number",
      'Amount (PKR)': "Amount (PKR)",
      'Donation Category': "Donation Category",
      'Transferred Via': "Transferred Via",
      'Transfer Date': "Transfer Date",
      'Transaction ID': "Transaction ID / Reference Number"
    };

    // Dynamically append all form fields with readable labels
    for (let [key, value] of formData.entries()) {
      if (key === "access_key" || key === "botcheck" || key === "subject" || key === "from_name" || key === "to_email") {
        continue;
      }
      const label = fieldLabels[key] || key;
      if (value instanceof File) {
        if (value.name && value.size > 0) {
          payload.fields[label] = `${value.name} (${Math.round(value.size / 1024)} KB)`;
        }
      } else if (typeof value === 'string' && value.trim() !== '') {
        payload.fields[label] = value.trim();
      }
    }

    // Attach student photo base64 if present
    const photoInput = form.querySelector('input[type="file"][name="studentPhoto"]');
    if (photoInput && photoInput.files && photoInput.files[0]) {
      try {
        const photoBase64 = await blobToBase64(photoInput.files[0]);
        if (photoBase64) {
          payload.studentPhotoBase64 = photoBase64;
          payload.fields['Student Photo'] = `${photoInput.files[0].name} (Passport Attached)`;
        }
      } catch (photoErr) {
        console.warn('MRQS Warning: Error converting photo to base64:', photoErr);
      }
    }

    // Attach visual receipt snapshot base64 if generated
    if (base64Snapshot) {
      payload.receipt_image = base64Snapshot;
      payload.fields['Receipt Image'] = 'Visual PNG Snapshot Attached';
    }

    // 6. Send POST Request to Google Apps Script Web App
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      // 7. Successful Delivery Feedback & Toast
      let successTitle = isUrdu ? 'کامیابی سے ارسال کر دیا گیا' : 'Submitted Successfully';
      let successMsg = '';

      if (formType === 'donation') {
        successMsg = isUrdu
          ? 'آپ کے عطیے کی تفصیلات اور تصدیقی رسید موصول ہو چکی ہیں۔ جزاک اللہ خیراً!'
          : 'Your donation intimation has been received successfully. JazakAllah Khair!';
      } else if (formType === 'admission') {
        successMsg = isUrdu
          ? 'آپ کی آن لائن داخلہ درخواست مع تصویری رسید کامیابی سے موصول ہو گئی ہے۔ ادارہ جلد آپ سے رابطہ کرے گا۔'
          : 'Your online admission application has been submitted successfully. The administration will contact you shortly.';
      } else {
        successMsg = isUrdu
          ? 'شکریہ! آپ کا پیغام کامیابی سے موصول ہو گیا ہے، جلد جواب دیا جائے گا۔'
          : 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
      }

      window.showMrqsToast(successTitle, successMsg, 'success', 7000);

      if (callbacks.onSuccess) callbacks.onSuccess({ status: 'success' });
      form.reset();

      // UI cleanup: photo preview box & char counters
      const photoBox = document.getElementById('photoUploadBox');
      if (photoBox) {
        photoBox.style.backgroundImage = 'none';
      }
      const charCounter = document.getElementById('char-counter');
      if (charCounter) {
        charCounter.innerText = '300/300';
      }

    } catch (networkErr) {
      console.error('MRQS Delivery Error (Google Apps Script):', networkErr);
      const errTitle = isUrdu ? 'کنکشن کی خرابی' : 'Connection Error';
      const errMsg = isUrdu
        ? 'درخواست ارسال کرنے میں خرابی پیش آئی ہے۔ براہ کرم انٹرنیٹ چیک کریں یا واٹس ایپ پر رابطہ کریں: +92 345 595 5958'
        : 'Network or transmission issue. Please check your connection or contact us directly on WhatsApp: +92 345 595 5958';

      window.showMrqsToast(errTitle, errMsg, 'error', 7000);
      if (callbacks.onError) callbacks.onError(networkErr);
    }
  };
})();
