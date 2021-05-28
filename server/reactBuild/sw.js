/* eslint-disable no-restricted-globals */

self.addEventListener('push', e => {
    const data = e.data.json();
   // console.log('sw', data)
    //console.log('(sw)Notification Received');
    self.registration.showNotification(data.title, {
        body: data.text,
        icon: "https://i.ibb.co/QQYf02y/logo.png"
    });
});