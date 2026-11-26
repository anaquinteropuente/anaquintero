/* Service worker mínimo: si no hay conexión, enseña la pantalla de los móviles (404.html). */
const CACHE = 'aq-offline-v1';
const OFFLINE = './404.html';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([OFFLINE, './assets/favicon.svg'])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;     // solo las páginas; el resto va directo a la red
  e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE)));
});
