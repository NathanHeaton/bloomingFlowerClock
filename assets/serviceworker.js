if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    })

}
const CACHE_NAME = 'Blooming-Clock';
const urlsToCache = [
  '/',
  '/index.html',
  '/css.css',
  '/file.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      return response || fetch(event.request);
    })
  );
});