self.addEventListener('install', event => {
  console.log('Service Worker installato.');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker attivato.');
});

self.addEventListener('fetch', event => {
  // Qui puoi aggiungere caching in futuro
  console.log('Richiesta intercettata:', event.request.url);
});
