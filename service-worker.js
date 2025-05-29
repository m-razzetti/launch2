self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './styles.css',
        './app.js'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      // Clone the request to avoid issues with streaming
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest, { credentials: 'omit' }).then(networkResponse => {
        return networkResponse;
      });
    })
  );
});
