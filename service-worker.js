const CACHE_NAME = 'moduli-cache-v1';
const urlsToCache = [
  '/moduliuscitadidattica/',
  '/moduliuscitadidattica/index.html',
  '/moduliuscitadidattica/manifest.json',
  '/moduliuscitadidattica/modulo-autorizzazione-organizzazione.pdf',
  '/moduliuscitadidattica/modulo-autorizzazione-genitori.pdf',
  '/moduliuscitadidattica/modulo-pagamento.pdf',
  '/moduliuscitadidattica/icon-192.png',
  '/moduliuscitadidattica/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});