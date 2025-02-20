importScripts('https://www.gstatic.com/firebasejs/11.3.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.3.0/firebase-messaging-compat.js');

if (!firebase.apps.length) { // Prevent duplicate Firebase initialization
  firebase.initializeApp({
    apiKey: "AIzaSyC5YUFw70vlDKCHJNqbday2-PiKj-HpOlA",
    authDomain: "mcwa-f793a.firebaseapp.com",
    projectId: "mcwa-f793a",
    storageBucket: "mcwa-f793a.appspot.com",
    messagingSenderId: "211726212195",
    appId: "1:211726212195:web:db26fecb295288d71b6c56",
    measurementId: "G-NNS72FG2SQ"
  });
}

const messaging = firebase.messaging(); // Declare only once


console.log("Firebase messaging service worker loaded");

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
