import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyC5YUFw70vlDKCHJNqbday2-PiKj-HpOlA",
    authDomain: "mcwa-f793a.firebaseapp.com",
    projectId: "mcwa-f793a",
    storageBucket: "mcwa-f793a.appspot.com",
    messagingSenderId: "211726212195",
    appId: "1:211726212195:web:db26fecb295288d71b6c56",
    measurementId: "G-NNS72FG2SQ"
  };

  const vapidkey = "BAaoVGqQ2F59B8Zi-eXGK0Fi5U1JJ15zIZSRFyv7bKBN4YrTMA9dNPOSn4vTl99yUwLiBcNK9vte6TdcQk3Dmrw";

  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);

  export const requestFCMToken = async () => {
    return Notification.requestPermission()
    .then((permission) => {
        console.log('Notification permission:', permission);
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            return getToken(messaging, {vapidKey: vapidkey})
        } else {
            console.log('Notification permission denied.');
            throw new Error('Notification permission denied.');
        }
    })
    .catch((err) => {
        console.error('Error getting FCM token:', err);
        throw err;
    });
  };

  export const onMessageListener = () =>
    new Promise((resolve) => {
      const unsub = onMessage(messaging, (payload) => {
        resolve(payload);
        unsub();
      });  
    });