
  const firebaseConfig = {
    apiKey: "AIzaSyCaJmjm4XVKh-PKMFv1lvDiDTda10GN3Hw",
    authDomain: "riaz-ul-quran-wal-sunnah.firebaseapp.com",
    databaseURL: "https://riaz-ul-quran-wal-sunnah-default-rtdb.firebaseio.com",
    projectId: "riaz-ul-quran-wal-sunnah",
    storageBucket: "riaz-ul-quran-wal-sunnah.firebasestorage.app",
    messagingSenderId: "1037550565994",
    appId: "1:1037550565994:web:6cc26d4c0b9aa48ad3a813"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.database();
