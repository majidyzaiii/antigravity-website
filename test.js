
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

