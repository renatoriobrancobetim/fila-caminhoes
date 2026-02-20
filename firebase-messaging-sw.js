importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "BOzu9G4ChbQkg1GsoegHqhd5-KNxAh6aNoJzw_4kY5cZrG4imUkvj9Sp_I7eQdNPYn3x8GJIV8OS2iKjlRkv8vQ",
  authDomain: "tabela-frete-rio-branco.firebaseapp.com",
  projectId: "tabela-frete-rio-branco",
  messagingSenderId: "765019849831",
  appId: "1:765019849831:web:f2089ab12a3eb7ea6880c2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "icon-192.png"
  });
});
