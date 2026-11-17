/**
 * Madrassa Riaz ul Quran wal Sunnah (MRQS)
 * Form Submission & Delivery Handler
 * - Online Admission: Client-Side 2-Page A4 PDF Generation (html2pdf.js) + Web3Forms Background Submission
 * - Donation & Contact: Structured Delivery Handler
 * Destination Email: info@mrqs.pk
 */

// ========================================================
// 1. CONFIGURATION
// ========================================================
window.MRQS_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQ1Bdt4rJZhOkIkT730bVAc1LWkwEMOOce7gEINdLi5R3pRe3FI4lnZLHd0j0BRwBi/exec";
window.MRQS_WEB3FORMS_ACCESS_KEY = "058abb09-aa64-4406-bc9d-c236026b80b5";

// ========================================================
// MRQS ADMISSION FEE CONFIGURATION (EDITABLE PLACEHOLDERS)
// Update amounts or currency easily here
// ========================================================
window.MRQS_FEE_CONFIG = {
  currency: "PKR",
  registrationFee: 2000, // Admission & Registration Processing Fee
  tuitionFees: {
    "Islamic & Moral Tarbiyat": 2500,
    "Nazra Quran Kareem": 2500,
    "Hifz-ul-Quran": 3500,
    "Online Classes for International Students": 5000
  }
};

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
   * Helper: Converts File/Blob to Base64 Data URL
   */
  function readFileAsDataUrl(file) {
    return new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Cached logo base64 loader to prevent canvas tainting in html2pdf
   */
  let cachedLogoBase64 = null;
  async function loadLogoAsBase64() {
    if (cachedLogoBase64) return cachedLogoBase64;
    try {
      const response = await fetch('assets/logo.png');
      const blob = await response.blob();
      cachedLogoBase64 = await readFileAsDataUrl(blob);
      return cachedLogoBase64;
    } catch (e) {
      return 'assets/logo.png';
    }
  }

  /**
   * Dedicated PDF Generator:
   * Temporarily clones the populated template into a visible staging container
   * positioned at left: 0, top: 0 with opacity: 1 so html2canvas renders
   * the exact crisp 210mm A4 document without any clipping, negative offset,
   * or blank canvas, and removes the staging container immediately when done.
   */
  async function generateAdmissionPdf(templateElement, pdfFileName) {
    if (typeof html2pdf === 'undefined' || !templateElement) {
      console.warn('MRQS Warning: html2pdf library not available or template missing.');
      return;
    }

    // 1. Deep clone the populated template
    const clone = templateElement.cloneNode(true);
    clone.id = 'pdf-render-staging-clone';
    clone.setAttribute('dir', 'ltr');
    clone.setAttribute('lang', 'en');

    // 2. Wrap inside an isolated staging container positioned at left: 0, top: 0 with opacity: 1
    const stagingContainer = document.createElement('div');
    stagingContainer.id = 'mrqs-pdf-worker-staging';
    stagingContainer.style.cssText = [
      'position: fixed !important',
      'left: 0 !important',
      'top: 0 !important',
      'width: 210mm !important',
      'background: #ffffff !important',
      'z-index: 999998 !important',
      'opacity: 1 !important',
      'pointer-events: none !important',
      'margin: 0 !important',
      'padding: 0 !important',
      'overflow: visible !important'
    ].join(';');

    clone.style.cssText = [
      'position: relative !important',
      'left: 0 !important',
      'top: 0 !important',
      'width: 210mm !important',
      'background: #ffffff !important',
      'opacity: 1 !important',
      'display: block !important',
      'margin: 0 !important',
      'padding: 0 !important'
    ].join(';');

    stagingContainer.appendChild(clone);
    document.body.appendChild(stagingContainer);

    const pdfOpt = {
      margin: 0,
      filename: pdfFileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        letterRendering: true,
        windowWidth: 794
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    try {
      await html2pdf().set(pdfOpt).from(clone).save();
    } catch (err) {
      console.error('MRQS Admission PDF Worker Error:', err);
    } finally {
      // 3. Immediately remove staging container and clone from DOM
      if (stagingContainer && stagingContainer.parentNode) {
        stagingContainer.parentNode.removeChild(stagingContainer);
      }
    }
  }

  /**
   * DEDICATED ADMISSION FORM HANDLER:
   * 1. Generates unique Application ID: MRQS-2026-XXXX
   * 2. Reads student photo to Base64 (fallback to clean placeholder)
   * 3. Populates off-screen 2-Page A4 PDF template (#pdf-print-template)
   * 4. Auto-downloads PDF using html2pdf.js via staging clone (MRQS-Admission-[StudentFirstName]-[ApplicationID].pdf)
   * 5. Sends clean structured text payload to Web3Forms (NO file attachments, NO screenshots)
   * 6. Displays confirmation modal with Application ID, re-download button, and WhatsApp link (+447438622542)
   */
  async function handleAdmissionSubmission(form, callbacks = {}) {
    // Concurrency guard against duplicate submissions
    if (form.dataset.isSubmitting === 'true') {
      return;
    }
    form.dataset.isSubmitting = 'true';

    const isUrdu = document.documentElement.lang === 'ur' || document.documentElement.dir === 'rtl';

    // 1. Validate form fields
    if (form.reportValidity && !form.reportValidity()) {
      delete form.dataset.isSubmitting;
      if (callbacks.onError) callbacks.onError({ message: 'Validation failed' });
      return;
    }

    // 2. Trigger loading state
    if (callbacks.onStart) callbacks.onStart();

    try {
      // 3. Generate dynamic Application ID: MRQS-2026-XXXX (4 random digits)
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const appId = `MRQS-2026-${randomNum}`;

      // Record submission date (e.g. "18 Nov 2026")
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const submissionDate = `${day} ${month} ${year}`;

      // 4. Extract Form Values
      const programRadio = form.querySelector('input[name="programSelection"]:checked');
      const program = programRadio ? programRadio.value : 'Nazra Quran Kareem';

      const firstName = (form.querySelector('#studentFirstName')?.value || '').trim();
      const lastName = (form.querySelector('#studentLastName')?.value || '').trim();
      const studentFullName = `${firstName} ${lastName}`.trim() || 'Applicant';

      const studentDob = form.querySelector('#studentDob')?.value || '---';
      const studentBForm = (form.querySelector('#studentBForm')?.value || '---').trim();
      const studentNationality = (form.querySelector('#studentNationality')?.value || 'Pakistani').trim();
      const prevEducation = (form.querySelector('#prevEducation')?.value || '---').trim();
      const prevSchool = (form.querySelector('#prevSchool')?.value || '---').trim();

      const fatherName = (form.querySelector('#fatherNameEn')?.value || '---').trim().toUpperCase();
      const fatherOccupation = (form.querySelector('#fatherOccupation')?.value || '---').trim();
      const guardianName = (form.querySelector('#guardianName')?.value || fatherName).trim();
      const guardianRelation = (form.querySelector('#guardianRelation')?.value || 'Father').trim();
      const guardianCnic = (form.querySelector('#guardianCnic')?.value || '---').trim();

      const mobile1 = (form.querySelector('#mobile1')?.value || '---').trim();
      const mobile2 = (form.querySelector('#mobile2')?.value || '---').trim();
      const whatsappNo = (form.querySelector('#whatsappNo')?.value || '---').trim();
      const tempAddress = (form.querySelector('#tempAddress')?.value || '---').trim();
      const permAddress = (form.querySelector('#permAddress')?.value || '---').trim();

      // 5. Convert Student Photo to Base64 (if uploaded)
      const photoInput = form.querySelector('#studentPhoto') || form.querySelector('input[type="file"][name="studentPhoto"]');
      let photoBase64 = null;
      if (photoInput && photoInput.files && photoInput.files[0]) {
        try {
          photoBase64 = await readFileAsDataUrl(photoInput.files[0]);
        } catch (photoErr) {
          console.warn('MRQS Warning: Error converting photo:', photoErr);
        }
      }

      // 6. Calculate Fee particulars from config
      const feeCfg = window.MRQS_FEE_CONFIG || {};
      const currency = feeCfg.currency || 'PKR';
      const regFee = feeCfg.registrationFee || 2000;
      const tuitionFee = (feeCfg.tuitionFees && feeCfg.tuitionFees[program]) ? feeCfg.tuitionFees[program] : 2500;
      const totalFee = regFee + tuitionFee;

      // 7. Ensure logo base64 is loaded for PDF embedding
      const logoDataUrl = await loadLogoAsBase64();
      const logo1 = document.getElementById('pdfAcademyLogo1');
      const logo2 = document.getElementById('pdfAcademyLogo2');
      if (logo1 && logoDataUrl) logo1.src = logoDataUrl;
      if (logo2 && logoDataUrl) logo2.src = logoDataUrl;

      // 8. Populate #pdf-print-template
      // --- Page 1: Application Form ---
      const pdfAppId1 = document.getElementById('pdfAppId1');
      if (pdfAppId1) pdfAppId1.innerText = appId;

      const pdfSubmitDate1 = document.getElementById('pdfSubmitDate1');
      if (pdfSubmitDate1) pdfSubmitDate1.innerText = submissionDate;

      const pdfPhotoBox = document.getElementById('pdfPhotoBox');
      if (pdfPhotoBox) {
        if (photoBase64) {
          pdfPhotoBox.innerHTML = `<img src="${photoBase64}" style="width:100%; height:100%; object-fit:cover; display:block;" alt="Student Photo">`;
        } else {
          pdfPhotoBox.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:#94a3b8; font-size:10px; font-weight:600;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:3px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>PHOTO</span>
              <span style="font-size:8px; opacity:0.8;">(35x45mm)</span>
            </div>`;
        }
      }

      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val || '---';
      };

      setTxt('pdfProgramName', program);
      setTxt('pdfStudentName', studentFullName.toUpperCase());
      setTxt('pdfDob', studentDob);
      setTxt('pdfBForm', studentBForm);
      setTxt('pdfNationality', studentNationality);
      setTxt('pdfPrevEducation', prevEducation);
      setTxt('pdfPrevSchool', prevSchool);

      setTxt('pdfFatherName', fatherName);
      setTxt('pdfFatherOccupation', fatherOccupation);
      setTxt('pdfGuardianName', guardianName);
      setTxt('pdfGuardianRelation', guardianRelation);
      setTxt('pdfGuardianCnic', guardianCnic);

      setTxt('pdfMobile1', mobile1);
      setTxt('pdfMobile2', mobile2);
      setTxt('pdfWhatsapp', whatsappNo);
      setTxt('pdfTempAddress', tempAddress);
      setTxt('pdfPermAddress', permAddress);

      // --- Page 2: Invoice / Challan ---
      setTxt('pdfInvoiceId', appId);
      setTxt('pdfInvoiceDate', submissionDate);
      setTxt('pdfInvoiceStudentName', studentFullName);
      setTxt('pdfInvoiceFatherName', fatherName);
      setTxt('pdfInvoiceProgram', program);
      setTxt('pdfInvoiceWhatsapp', whatsappNo);

      setTxt('pdfRegFee', `${currency} ${regFee.toLocaleString()}`);
      setTxt('pdfTuitionTitle', `First Month Tuition Fee (Course: ${program})`);
      setTxt('pdfTuitionFee', `${currency} ${tuitionFee.toLocaleString()}`);
      setTxt('pdfTotalFee', `${currency} ${totalFee.toLocaleString()}`);

      // 9. Generate and Auto-Download 2-Page A4 PDF using html2pdf.js staging clone
      const cleanFirstName = (firstName || 'Student').replace(/[^a-zA-Z0-9_-]/g, '');
      const pdfFileName = `MRQS-Admission-${cleanFirstName}-${appId}.pdf`;
      const templateElement = document.getElementById('pdf-print-template');

      // Execute PDF rendering inside staging container
      await generateAdmissionPdf(templateElement, pdfFileName);

      // 10. Send Clean Data to Web3Forms (Pure text/JSON - NO screenshots, NO file attachments)
      const web3AccessKey = window.MRQS_WEB3FORMS_ACCESS_KEY || "058abb09-aa64-4406-bc9d-c236026b80b5";
      const web3Payload = {
        access_key: web3AccessKey,
        subject: `New Online Admission Application - ${appId} (${studentFullName})`,
        from_name: "MRQS Admissions Portal",
        to_email: "info@mrqs.pk",
        "Application ID": appId,
        "Submission Date": submissionDate,
        "Selected Program": program,
        "Student Full Name": studentFullName,
        "Date of Birth": studentDob,
        "Candidate B-Form / CNIC": studentBForm,
        "Nationality": studentNationality,
        "Previous Education": prevEducation,
        "Previous School": prevSchool,
        "Father's Name": fatherName,
        "Father's Occupation": fatherOccupation,
        "Guardian's Name": guardianName,
        "Relation with Candidate": guardianRelation,
        "Guardian CNIC No": guardianCnic,
        "Mobile Number 1": mobile1,
        "Mobile Number 2": mobile2,
        "WhatsApp Number": whatsappNo,
        "Current / Temporary Address": tempAddress,
        "Permanent Address": permAddress,
        "Guardian Undertaking": "Verified & Accepted",
        "Rules & Regulations": "Accepted",
        "Registration Fee": `${currency} ${regFee.toLocaleString()}`,
        "Tuition Fee": `${currency} ${tuitionFee.toLocaleString()}`,
        "Total Payable Amount": `${currency} ${totalFee.toLocaleString()}`,
        "Generated PDF Document": `Auto-Downloaded: ${pdfFileName}`
      };

      // Asynchronously dispatch to Web3Forms in background
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(web3Payload)
      }).then(res => res.json()).then(data => {
        console.log('MRQS Web3Forms Admission Delivery:', data);
      }).catch(err => {
        console.warn('MRQS Web3Forms Delivery Notice:', err);
      });

      // Also dispatch clean structured text to Google Apps Script endpoint if configured
      if (window.MRQS_APPS_SCRIPT_URL) {
        fetch(window.MRQS_APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            form_type: "Online Admission Application",
            studentName: studentFullName,
            appId: appId,
            submissionDate: submissionDate,
            fields: web3Payload
          })
        }).catch(() => {});
      }

      // 11. Wire and Display Confirmation Modal
      const modal = document.getElementById('admissionSuccessModal');
      if (modal) {
        // Update modal bilingual texts based on current document language
        if (isUrdu) {
          modal.querySelectorAll('[data-ur]').forEach(el => {
            el.innerHTML = el.getAttribute('data-ur');
          });
        } else {
          modal.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = el.getAttribute('data-en');
          });
        }

        const modalAppId = document.getElementById('modalAppId');
        if (modalAppId) modalAppId.innerText = appId;

        // Setup "Download Admission & Invoice PDF Again" button
        const downloadAgainBtn = document.getElementById('downloadPdfAgainBtn');
        if (downloadAgainBtn) {
          downloadAgainBtn.onclick = async () => {
            downloadAgainBtn.disabled = true;
            const origHtml = downloadAgainBtn.innerHTML;
            downloadAgainBtn.innerHTML = '<span>Downloading...</span>';
            try {
              await generateAdmissionPdf(templateElement, pdfFileName);
            } catch (reErr) {
              console.error('Re-download error:', reErr);
            } finally {
              downloadAgainBtn.disabled = false;
              downloadAgainBtn.innerHTML = origHtml;
            }
          };
        }

        // Setup WhatsApp confirmation button linking to +447438622542
        const whatsappConfirmBtn = document.getElementById('whatsappConfirmBtn');
        if (whatsappConfirmBtn) {
          const waText = isUrdu
            ? `السلام علیکم! میں نے ${studentFullName} کے لیے آن لائن داخلہ فارم جمع کروا دیا ہے (درخواست نمبر: ${appId}، مطلوبہ کورس: ${program})۔ برائے مہربانی میری درخواست کی تصدیق فرمائیں اور فیس جمع کروانے کے بعد کلاسز کے آغاز کی رہنمائی فرمائیں۔`
            : `Assalam-o-Alaikum, I have submitted the online admission application for ${studentFullName} (Application ID: ${appId}, Course: ${program}). Please verify my admission and share payment/class activation details.`;
          whatsappConfirmBtn.href = `https://wa.me/447438622542?text=${encodeURIComponent(waText)}`;
        }

        // Close modal events
        const closeModal = () => { modal.style.display = 'none'; };
        const closeBtn = document.getElementById('modalCloseBtn');
        if (closeBtn) closeBtn.onclick = closeModal;
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); }, { once: true });

        modal.style.display = 'flex';
      }

      // 12. Show Success Toast Notification
      const toastTitle = isUrdu ? 'کامیابی سے جمع ہو گیا' : 'Application Submitted Successfully';
      const toastMsg = isUrdu
        ? `آپ کی داخلہ درخواست (نمبر: ${appId}) جمع ہو چکی ہے اور 2 صفحات کا پی ڈی ایف ڈاؤن لوڈ کر دیا گیا ہے۔`
        : `Your application (${appId}) has been registered and the 2-page Admission Form & Invoice PDF has been downloaded.`;
      window.showMrqsToast(toastTitle, toastMsg, 'success', 8000);

      // 13. UI cleanup: Reset form and preview
      form.reset();
      const photoBox = document.getElementById('photoUploadBox');
      if (photoBox) {
        photoBox.style.backgroundImage = 'none';
      }

      if (callbacks.onSuccess) {
        callbacks.onSuccess({ status: 'success', appId: appId, pdf: pdfFileName });
      }

    } catch (err) {
      console.error('MRQS Admission Submission Error:', err);
      const errTitle = isUrdu ? 'خرابی' : 'Submission Error';
      const errMsg = isUrdu
        ? 'درخواست پراسیس کرنے میں خرابی پیش آئی ہے۔ براہ کرم انٹرنیٹ چیک کریں یا واٹس ایپ پر رابطہ کریں: +44 7438 622542'
        : 'An error occurred during submission. Please check your connection or contact us on WhatsApp: +44 7438 622542';
      window.showMrqsToast(errTitle, errMsg, 'error', 7000);
      if (callbacks.onError) callbacks.onError(err);
    } finally {
      delete form.dataset.isSubmitting;
    }
  }

  /**
   * Main Form Submission Handler for MRQS
   * Routes 'admission' to dedicated dual workflow (html2pdf + Web3Forms)
   * Routes 'donation' and 'contact' to standard structured Apps Script submission
   */
  window.submitMrqsForm = async function(form, formType, callbacks = {}) {
    // Check if form is admission form
    if (formType === 'admission' || form.id === 'madrasaAdmissionForm' || form.id === 'admission-form') {
      return await handleAdmissionSubmission(form, callbacks);
    }

    // Standard donation / contact handling
    const isUrdu = document.documentElement.lang === 'ur' || document.documentElement.dir === 'rtl';

    if (form.reportValidity && !form.reportValidity()) {
      if (callbacks.onError) callbacks.onError({ message: 'Validation failed' });
      return;
    }

    if (callbacks.onStart) callbacks.onStart();

    const submitBtn = form.querySelector('button[type="submit"]');
    let originalBtnText = '';
    if (submitBtn) {
      originalBtnText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = isUrdu ? "ارسال ہو رہا ہے..." : "Sending...";
    }

    const APPS_SCRIPT_URL = window.MRQS_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyQ1Bdt4rJZhOkIkT730bVAc1LWkwEMOOce7gEINdLi5R3pRe3FI4lnZLHd0j0BRwBi/exec";
    const formData = new FormData(form);

    let form_type = form.dataset.formType;
    if (!form_type) {
      form_type = (formType === 'donation') ? 'Donation Intimation Receipt' : 'Contact Message';
    }

    let senderName = 'Website Visitor';
    if (formType === 'donation') {
      senderName = (form.querySelector('[name="Donor Full Name"]')?.value || formData.get('Donor Full Name') || 'Donor').trim();
    } else {
      const fName = (form.querySelector('[name="First Name"]')?.value || formData.get('First Name') || '').trim();
      const lName = (form.querySelector('[name="Last Name"]')?.value || formData.get('Last Name') || '').trim();
      senderName = (fName + ' ' + lName).trim() || 'Website Visitor';
    }

    const payload = {
      form_type: form_type,
      studentName: senderName,
      fields: {}
    };

    for (let [key, value] of formData.entries()) {
      if (key === "access_key" || key === "botcheck" || key === "subject" || key === "from_name" || key === "to_email") {
        continue;
      }
      if (typeof value === 'string' && value.trim() !== '') {
        payload.fields[key] = value.trim();
      }
    }

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      const successTitle = isUrdu ? 'کامیابی سے ارسال کر دیا گیا' : 'Submitted Successfully';
      const successMsg = formType === 'donation'
        ? (isUrdu ? 'آپ کے عطیے کی تفصیلات موصول ہو چکی ہیں۔ جزاک اللہ خیراً!' : 'Your donation intimation has been received successfully. JazakAllah Khair!')
        : (isUrdu ? 'شکریہ! آپ کا پیغام کامیابی سے موصول ہو گیا ہے، جلد جواب دیا جائے گا۔' : 'Thank you! Your message has been sent successfully. We will get back to you shortly.');

      window.showMrqsToast(successTitle, successMsg, 'success', 7000);
      if (callbacks.onSuccess) callbacks.onSuccess({ status: 'success' });
      form.reset();

    } catch (networkErr) {
      console.error('MRQS Delivery Error:', networkErr);
      const errTitle = isUrdu ? 'کنکشن کی خرابی' : 'Connection Error';
      const errMsg = isUrdu
        ? 'درخواست ارسال کرنے میں خرابی پیش آئی ہے۔ براہ کرم انٹرنیٹ چیک کریں یا واٹس ایپ پر رابطہ کریں: +44 7438 622542'
        : 'Network issue. Please check your connection or contact us on WhatsApp: +44 7438 622542';
      window.showMrqsToast(errTitle, errMsg, 'error', 7000);
      if (callbacks.onError) callbacks.onError(networkErr);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  };

  // Direct Auto-Binding on DOM ready for all forms
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let fType = 'contact';
        if (form.id === 'madrasaAdmissionForm' || form.id === 'admission-form') {
          fType = 'admission';
        } else if (form.id === 'donationForm') {
          fType = 'donation';
        }
        await window.submitMrqsForm(form, fType);
      });
    });
  });
})();
