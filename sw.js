const CACHE_NAME = 'Beer-Tasting-Club-v2';
const urlsToCache = [
  '/Beer-Tasting-Club/',
  '/Beer-Tasting-Club/index.html',
  '/Beer-Tasting-Club/css/style.css',
  '/Beer-Tasting-Club/js/app.js',
  '/Beer-Tasting-Club/assets/logo.png'
];

// Installazione del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Attivazione e pulizia vecchie cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch: Strategia Network First (Cerca online, se fallisce usa la cache)
// Questo è ideale per un'app che usa Supabase e deve essere sempre aggiornata
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});