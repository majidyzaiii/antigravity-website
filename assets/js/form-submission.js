/**
 * Madrassa Riaz ul Quran wal Sunnah (MRQS)
 * Form Submission & Delivery Handler via Web3Forms
 * Destination Email: info@mrqs.pk (forwarded to mrqs.pk@gmail.com)
 */

// ========================================================
// 1. CONFIGURATION
// To get your free Access Key:
// 1. Visit: https://web3forms.com
// 2. Enter: info@mrqs.pk (or mrqs.pk@gmail.com)
// 3. Paste the Access Key (UUID) below:
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

  // Toast Function
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
   * Main Form Submission Handler
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

    // Check if key is configured
    if (!accessKey) {
      console.warn('MRQS Warning: Web3Forms access_key is not configured yet.');
      const warningTitle = isUrdu ? 'رسائی کی (Access Key) درکار ہے' : 'Web3Forms Key Required';
      const warningMsg = isUrdu
        ? 'فارم ای میل کی ترسیل کے لیے Web3Forms Access Key درکار ہے۔ آپ براہِ راست واٹس ایپ پر بھی رابطہ کر سکتے ہیں: <strong>+92 345 595 5958</strong>'
        : 'Form submission requires a Web3Forms Access Key. Configure it in <code>assets/js/form-submission.js</code> or contact us via WhatsApp: <strong>+92 345 595 5958</strong>';

      window.showMrqsToast(warningTitle, warningMsg, 'warning', 8000);
      if (callbacks.onError) callbacks.onError({ message: 'Access Key is not configured' });
      return;
    }

    // 4. Extract and structure payload
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
      // Don't include raw file objects in JSON payload
      if (value instanceof File) {
        if (value.name) payload[key] = `[Attached File: ${value.name} (${Math.round(value.size / 1024)} KB)]`;
      } else {
        payload[key] = value;
      }
    });

    payload['access_key'] = accessKey;

    // Structure metadata based on form type
    if (formType === 'contact') {
      const firstName = payload['First Name'] || '';
      const lastName = payload['Last Name'] || '';
      payload['name'] = (firstName + ' ' + lastName).trim() || payload['name'] || 'Website Visitor';
      payload['subject'] = 'New Contact Message - MRQS Portal';
      payload['from_name'] = 'MRQS Contact Portal';
    } else if (formType === 'donation') {
      payload['name'] = payload['Donor Full Name'] || 'MRQS Donor';
      payload['subject'] = 'New Donation Intimation Receipt - MRQS';
      payload['from_name'] = 'MRQS Donation Portal';
    } else if (formType === 'admission') {
      const firstName = payload['studentFirstName'] || '';
      const lastName = payload['studentLastName'] || '';
      payload['name'] = (firstName + ' ' + lastName).trim() || 'Admission Applicant';
      payload['subject'] = 'New Online Admission Application - MRQS';
      payload['from_name'] = 'MRQS Admissions Portal';
    }

    // 5. Send POST request to Web3Forms API
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json();

      if (response.ok && json.success) {
        // Success Toast
        let successTitle = isUrdu ? 'کامیابی سے ارسال کر دیا گیا' : 'Sent Successfully';
        let successMsg = '';

        if (formType === 'donation') {
          successMsg = isUrdu
            ? 'آپ کے عطیے کی تفصیلات موصول ہو چکی ہیں۔ جزاک اللہ خیراً!'
            : 'Your donation receipt intimation has been received. JazakAllah Khair!';
        } else if (formType === 'admission') {
          successMsg = isUrdu
            ? 'آپ کی آن لائن داخلہ درخواست کامیابی سے موصول ہو گئی ہے۔ ادارہ جلد آپ سے رابطہ کرے گا۔'
            : 'Online admission application submitted successfully. We will contact you soon!';
        } else {
          successMsg = isUrdu
            ? 'شکریہ! آپ کا پیغام ہمیں موصول ہو گیا ہے، جلد جواب دیا جائے گا۔'
            : 'Thank you! Your message has been received, we will get back to you shortly.';
        }

        window.showMrqsToast(successTitle, successMsg, 'success', 7000);

        if (callbacks.onSuccess) callbacks.onSuccess(json);
        form.reset();

      } else {
        // Error from API
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
