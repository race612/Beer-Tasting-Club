// sw.js
// IMPORTANTE: Cambia questa stringa ad ogni rilascio per forzare l'aggiornamento sugli utenti
const CACHE_NAME = 'btc-cache-v0.8.1-beta';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './info.html',
  './privacy.html',
  './linee-guida.html',
  './tools.html',
  './guidelines/bjcp-2021-en.html',
  './guidelines/unionbirrai-2026.html',
  './data/bjcp-2021.json',
  './data/unionbirrai-2026.json',
  './changelog.json',
  './css/style.css',
  './js/app-version.js',
  './js/bjcp-2021.js',
  './assets/logo.png',
  './assets/icon-192.png',
  './assets/fonts/beer-icon.woff2',
  './assets/fonts/beer-icon.ttf',
  './assets/fonts/beer-icon.woff'
];

// INSTALLAZIONE
self.addEventListener('install', (event) => {
  //self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// ATTIVAZIONE
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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});