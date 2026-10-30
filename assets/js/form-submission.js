/**
 * Madrassa Riaz ul Quran wal Sunnah (MRQS)
 * Form Submission & Delivery Handler via Web3Forms with Visual Snapshot Receipt (html2canvas)
 * Destination Email: info@mrqs.pk (forwarded to mrqs.pk@gmail.com)
 */

// ========================================================
// 1. CONFIGURATION
// Active Verified Web3Forms Access Key:
// ========================================================
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
   * Main Form Submission Handler with Visual Snapshot Attachment
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

    // 2. Loading state
    if (callbacks.onStart) callbacks.onStart();

    // 3. Resolve Access Key
    const formKeyInput = form.querySelector('[name="access_key"]');
    const accessKey = (formKeyInput && formKeyInput.value && formKeyInput.value !== 'YOUR_ACCESS_KEY_HERE')
      ? formKeyInput.value
      : (window.MRQS_WEB3FORMS_ACCESS_KEY && window.MRQS_WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE')
        ? window.MRQS_WEB3FORMS_ACCESS_KEY
        : null;

    if (!accessKey) {
      console.warn('MRQS Warning: Web3Forms access_key is not configured yet.');
      const warningTitle = isUrdu ? 'رسائی کی (Access Key) درکار ہے' : 'Web3Forms Key Required';
      const warningMsg = isUrdu
        ? 'فارم ای میل کی ترسیل کے لیے Web3Forms Access Key درکار ہے۔ آپ براہِ راست واٹس ایپ پر بھی رابطہ کر سکتے ہیں: <strong>+92 345 595 5958</strong>'
        : 'Form submission requires a Web3Forms Access Key. Configure it in assets/js/form-submission.js or contact us via WhatsApp: +92 345 595 5958';

      window.showMrqsToast(warningTitle, warningMsg, 'warning', 8000);
      if (callbacks.onError) callbacks.onError({ message: 'Access Key is not configured' });
      return;
    }

    // 4. Generate Visual Snapshot (PNG Image Blob)
    let snapshotTarget = form;
    if (formType === 'admission') {
      snapshotTarget = form.closest('.online-admission-form-container') || form;
    } else if (formType === 'donation' || formType === 'contact') {
      snapshotTarget = form.closest('.floating-form-card') || form;
    }

    let snapshotBlob = null;
    try {
      snapshotBlob = await generateVisualSnapshotBlob(snapshotTarget);
    } catch (e) {
      console.warn('MRQS Warning: Error during visual snapshot generation:', e);
    }

    // 5. Build FormData for Multipart Submission with Attachment
    const formData = new FormData(form);
    formData.set('access_key', accessKey);

    let fileName = 'Form-Receipt.png';
    if (formType === 'contact') {
      const firstName = formData.get('First Name') || '';
      const lastName = formData.get('Last Name') || '';
      const fullName = (firstName + ' ' + lastName).trim() || formData.get('name') || 'Website Visitor';
      formData.set('name', fullName);
      formData.set('subject', 'New Contact Message - MRQS Portal');
      formData.set('from_name', 'MRQS Contact Portal');
      fileName = 'Contact-Message-Receipt.png';
    } else if (formType === 'donation') {
      const donorName = formData.get('Donor Full Name') || 'MRQS Donor';
      formData.set('name', donorName);
      formData.set('subject', 'New Donation Intimation Receipt - MRQS');
      formData.set('from_name', 'MRQS Donation Portal');
      fileName = 'Donation-Intimation-Receipt.png';
    } else if (formType === 'admission') {
      const firstName = formData.get('studentFirstName') || '';
      const lastName = formData.get('studentLastName') || '';
      const fullName = (firstName + ' ' + lastName).trim() || 'Admission Applicant';
      formData.set('name', fullName);
      formData.set('subject', 'New Online Admission Application - MRQS');
      formData.set('from_name', 'MRQS Admissions Portal');
      fileName = 'Admission-Application-Receipt.png';
    }

    // Attach the generated PNG snapshot as 'attachment'
    if (snapshotBlob) {
      formData.append('attachment', snapshotBlob, fileName);
    }

    // 6. Send POST Request to Web3Forms API
    try {
      let response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      let json = await response.json();

      // Graceful Fallback:
      // If Web3Forms returns that file attachments require a Pro plan,
      // seamlessly retry without the attachment so form submission NEVER fails and email is delivered!
      if (!response.ok || !json.success) {
        const errorMsg = (json && json.message) ? json.message.toLowerCase() : '';
        if (errorMsg.includes('pro feature') || errorMsg.includes('upload') || errorMsg.includes('attachment') || errorMsg.includes('file')) {
          console.warn('Web3Forms returned Pro requirement for attachment. Retrying submission without file attachment to ensure email delivery...');
          formData.delete('attachment');
          response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: formData
          });
          json = await response.json();
        }
      }

      if (response.ok && json.success) {
        // Success Toast
        let successTitle = isUrdu ? 'کامیابی سے ارسال کر دیا گیا' : 'Sent Successfully';
        let successMsg = '';

        if (formType === 'donation') {
          successMsg = isUrdu
            ? 'آپ کے عطیے کی تفصیلات اور تصدیقی رسید موصول ہو چکی ہیں۔ جزاک اللہ خیراً!'
            : 'Your donation intimation and visual receipt snapshot have been received. JazakAllah Khair!';
        } else if (formType === 'admission') {
          successMsg = isUrdu
            ? 'آپ کی آن لائن داخلہ درخواست مع تصویری رسید کامیابی سے موصول ہو گئی ہے۔ ادارہ جلد آپ سے رابطہ کرے گا۔'
            : 'Online admission application and visual receipt snapshot submitted successfully. We will contact you soon!';
        } else {
          successMsg = isUrdu
            ? 'شکریہ! آپ کا پیغام ہمیں موصول ہو گیا ہے، جلد جواب دیا جائے گا۔'
            : 'Thank you! Your message has been received, we will get back to you shortly.';
        }

        window.showMrqsToast(successTitle, successMsg, 'success', 7000);

        if (callbacks.onSuccess) callbacks.onSuccess(json);
        form.reset();

      } else {
        console.error('Web3Forms Error Response:', json);
        const errTitle = isUrdu ? 'ارسال نہیں ہو سکا' : 'Submission Failed';
        const errMsg = isUrdu
          ? (json.message || 'درخواست ارسال کرنے میں خرابی پیش آئی ہے۔ براہ کرم دوبارہ کوشش کریں یا واٹس ایپ پر رابطہ کریں۔')
          : (json.message || 'Failed to submit form. Please try again or reach out directly via WhatsApp: +92 345 595 5958');

        window.showMrqsToast(errTitle, errMsg, 'error', 7000);
        if (callbacks.onError) callbacks.onError(json);
      }
    } catch (networkErr) {
      console.error('Web3Forms Network Error:', networkErr);
      const errTitle = isUrdu ? 'کنکشن کی خرابی' : 'Network Error';
      const errMsg = isUrdu
        ? 'انٹرنیٹ کنکشن کی خرابی۔ براہ کرم رابطہ چیک کریں یا واٹس ایپ نمبر پر رابطہ کریں: +92 345 595 5958'
        : 'Network connection issue. Please check your connection or contact us directly on WhatsApp: +92 345 595 5958';

      window.showMrqsToast(errTitle, errMsg, 'error', 7000);
      if (callbacks.onError) callbacks.onError(networkErr);
    }
  };
})();
