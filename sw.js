// sw.js
// IMPORTANTE: Cambia questa stringa ad ogni rilascio per forzare l'aggiornamento sugli utenti
const CACHE_NAME = 'btc-cache-v0.6.23';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './nuova-scheda.html',
  './storico.html',
  './profilo.html',
  './info.html',
  './privacy.html',
  './changelog.json', // <-- Aggiunto questo!
  './schede/bjcp-sintetica.html',
  './schede/crocette.html',
  './dettaglio-scheda.html',
  './css/style.css',
  './js/config.js',
  './js/supabase-config.js',
  './js/bjcp-2021.js',
  './assets/logo.png',
  './assets/icon-192.png',
  './fonts/beer-icon.woff2',
  './fonts/beer-icon.ttf',
  './fonts/beer-icon.woff'
];

// INSTALLAZIONE
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// ATTIVAZIONE (Pulizia vecchia cache)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      return response || fetch(event.request);
    })
  );
});