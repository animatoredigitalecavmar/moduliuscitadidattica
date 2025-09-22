const CACHE_NAME = 'moduli-uscite-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css', // se separi il CSS
  '/modulo-autorizzazione-organizzazione.pdf',
  '/modulo-autorizzazione-genitori.pdf',
  '/modulo-pagamento.pdf'
];

// Installazione
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Attivazione e pulizia vecchi cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch: risponde da cache o rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
