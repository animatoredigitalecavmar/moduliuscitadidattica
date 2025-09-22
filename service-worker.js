// Nome del cache
const CACHE_NAME = 'uscite-cache-v1';

// File da cacheare
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css', // se separi il CSS
  '/modulo-autorizzazione-organizzazione.pdf',
  '/modulo-autorizzazione-genitori.pdf',
  '/modulo-pagamento.pdf',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Installazione del Service Worker e caching dei file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aperta e file aggiunti');
        return cache.addAll(urlsToCache);
      })
  );
});

// Attivazione del Service Worker e pulizia vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminata vecchia cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercetta le richieste e serve dalla cache quando possibile
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
