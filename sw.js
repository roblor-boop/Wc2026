// WC2026 Sweepstake Service Worker
// Caches the app shell so it loads instantly and works offline (view-only)
const CACHE = 'wc2026-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for Firebase and API calls; cache-first for shell files
  const url = new URL(e.request.url);
  const isShell = SHELL.some(s => url.pathname.endsWith(s.replace('./', '/')));
  const isExternal = url.hostname !== self.location.hostname;

  if (isExternal) {
    // Don't intercept external requests (Firebase, APIs)
    return;
  }

  if (isShell) {
    // Cache-first for app shell
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
  }
});
