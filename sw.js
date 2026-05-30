// WC2026 Sweepstake Service Worker — NETWORK-FIRST
// Always fetches the latest version when online; cache is offline fallback only.
// Bump CACHE version to force-clear old caches on each deploy.
const CACHE = 'wc2026-v3';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  self.skipWaiting(); // activate new SW immediately
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never intercept external requests (Firebase, football API, fonts)
  if (url.hostname !== self.location.hostname) return;
  // Never cache the API or Firebase
  if (url.pathname.includes('firebase') || url.search.includes('auth')) return;

  // NETWORK-FIRST: try the network, fall back to cache only when offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Update the cache with the fresh copy
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request)) // offline → serve cached
  );
});

// Allow the page to tell the SW to skip waiting
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
