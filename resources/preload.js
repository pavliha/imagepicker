if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration)=> {

        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((err) => {
        console.error('ServiceWorker registration failed: ', err);
    });
}