const urlsToCache = [
    '/',
    '/main.js',
    '/styles/main.css'
];

// Set the callback for the install step
self.addEventListener('install', (e)=> {
    e.waitUntil(
        caches.open("my-site-cache-v1")
            .then(()=> {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    )
});
self.addEventListener("fetch", (e)=> {
    e.respondWith(
        caches.match(e.request)
            .then((response)=> {
                console.log("Cache returned");
                if (response) return response;
                return fetch(e.request);
            })
    )
});