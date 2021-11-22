const CACHE_ELEMENTS = [
        "./",
        "https://unpkg.com/react@17/umd/react.production.min.js",
        "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
        "https://unpkg.com/@babel/standalone/babel.min.js",
        "./style.css",
        "./components/Contador.js"
]

const CACHE_NAME = "v3_cache_contador_react"

//Primer parte del ciclo de vida(install)
self.addEventListener("install", (e) => {
        //console.log(e);
        e.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                        cache
                                .addAll(CACHE_ELEMENTS)
                                .then(() => {
                                        self.skipWaiting()
                                }).catch(console.log)
                })
        );
});

//Segunda parte del ciclo de vida (activate)
self.addEventListener("activate", (e) => {
        //console.log(e);
        const cacheWhitelist = [CACHE_NAME];
        e.waitUntil(
                caches.keys().then((cachesNames) => {
                        //console.log(cachesNames)
                        return Promise.all(cachesNames.map(cacheName => {
                                cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
                        }));
                }).then(() => self.clients.claim())
        );
});

//Tercer parte del ciclo de vida (fetch)
self.addEventListener("fetch", (e) => {
        e.respondWith(caches.match(e.request).then((res) => {
                if (res) {
                        return res;
                }
                return fetch(e.request);
        }));
});