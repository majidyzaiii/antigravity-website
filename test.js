
let selectedTravelMode = 'driving';

function setMode(mode, element) {
  selectedTravelMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => tab.classList.remove('active'));
  element.classList.add('active');
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      document.getElementById('userOrigin').value = position.coords.latitude + "," + position.coords.longitude;
    }, () => {
      alert("Location permission denied. Please type your starting area manually.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function navigateToMadrasa() {
  const origin = document.getElementById('userOrigin').value.trim();
  const destination = encodeURIComponent("Jamia Masjid Quba, Muslim Town, Rawalpindi");
  
  if (!origin) {
    alert("Please enter your starting location or click GPS!");
    return;
  }
  
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=${mode}`;
  window.open(mapsUrl, '_blank');
}
