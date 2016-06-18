// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js').then((registration)=> {
//
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }).catch((err) => {
//         console.error('ServiceWorker registration failed: ', err);
//     });
// }

function loadScript(src) {
    return new window.Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = "/js/"+src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

function dd(...val){
    console.log(...val)
}