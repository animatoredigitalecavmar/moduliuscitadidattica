const CACHE_NAME = "uscite-cache-v1";
const URLS_TO_CACHE = [
  "./", // homepage
  "./index.html",
  "./manifest.json",
  "./modulo-autorizzazione-organizzazione.pdf",
  "./modulo-autorizzazione-genitori.pdf",
  "./modulo-pagamento.pdf",
  "./icon-192.png",
  "./icon-512.png"
];

// Installazione: mette in cache i file essenziali
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching iniziale completato");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Attivazione: pulisce cache vecchie
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Cache vecchia rimossa:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve file dalla cache, se non disponibili li scarica
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Risposta da cache
      }
      return fetch(event.request).then(networkResponse => {
        // Aggiorna la cache con nuove risorse
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Risposta di fallback in caso di totale mancanza rete
        return new Response(
          "<h1>Offline</h1><p>Non hai connessione e il file non è stato ancora salvato.</p>",
          { headers: { "Content-Type": "text/html" } }
        );
      });
    })
  );
});
