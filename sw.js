const CACHE_NAME = 'hbl-tasting-v1';
const urlsToCache = [
  '/HBL-Tasting/',
  '/HBL-Tasting/index.html',
  '/HBL-Tasting/css/style.css',
  '/HBL-Tasting/js/app.js',
  '/HBL-Tasting/assets/logo.png'
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