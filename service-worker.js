// Service Worker for Kids Schedule PWA
// Precaches key assets and provides offline fallback

const CACHE_NAME = 'kids-schedule-v1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://cdn.tailwindcss.com'
];

// Install: precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }
      // Otherwise, try the network
      return fetch(event.request).then((response) => {
        // Cache successful network responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback: return a simple offline page or cached content
        // For now, we'll just let it fail gracefully since the app is single-page
        return new Response('Offline – please try again when you have a connection.', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});
