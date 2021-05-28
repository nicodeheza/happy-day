const pushServerPublicKey= 'BKyP2ldVQRindSkOeqb8Sl-oZG3br49DaDCGYPGw4rEu9tFbF1t1rG9rEjRbBfbAPnFhZNHLTw8rZ0XzfyMQkqE';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
  }

  function registerServiceWorker() {
    return navigator.serviceWorker.register("/sw.js");
  }

  async function askUserPermission() {
    return await Notification.requestPermission();
  }

  async function createNotificationSubscription() {
    //wait for service worker installation to be ready
    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(pushServerPublicKey)
    });
  }

  async function postSubscription(subscription) {
    const response = await  fetch('http://localhost:4000/api/noti-sub',{
        method:'POST',
        body: JSON.stringify(subscription),
        headers:{"Content-type": "application/json; charset=UTF-8"},
        credentials: 'include'
    });

    return await response.json();
  }

 
  export {
    isPushNotificationSupported,
    registerServiceWorker,
    askUserPermission,
    createNotificationSubscription,
    postSubscription
  };

