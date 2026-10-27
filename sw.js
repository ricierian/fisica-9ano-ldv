/* Funciona sem internet: guarda o app no celular.
   Ao publicar uma versão nova, mude o número em VERSAO. */
const VERSAO = 'fisica9-v3';
const BASE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Páginas: tenta a internet primeiro (pega a versão mais nova) e usa a cópia guardada se estiver offline.
  if (req.mode === 'navigate'){
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSAO).then(c => c.put('./index.html', cp)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Demais arquivos (ícones, fontes): usa a cópia guardada e atualiza em segundo plano.
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')){ const cp = r.clone(); caches.open(VERSAO).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
