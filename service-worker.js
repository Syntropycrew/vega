// Vega PWA – cacht nur die App-Hülle. API-Aufrufe (Google, Groq, Gemini, OpenRouter, Pollinations) werden NIE gecacht.
// shell v3 (2026-11-10): lange Dokumente gehen vollständig an das Modell (aktuelle Nachricht, Augen-Dateien, Auto-Suche).
const CACHE = 'vega-shell-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // fremde Server (APIs, Google-Login) nie anfassen
  if (url.pathname.includes('/api/')) return;
  // Netzwerk zuerst (immer aktuelle Version), bei Offline aus dem Cache
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok && SHELL.some(p => url.pathname.endsWith(p.replace('./', '/')) || (p === './' && url.pathname.endsWith('/')))) {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
