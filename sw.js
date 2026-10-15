const CACHE='vivid-passbook-7-shell-v1';
const SHELL=['/','/index.html','/app.js','/config.example.js','/manifest.webmanifest','/assets/icon-192.png','/assets/icon-512.png','/legacy/index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;const u=new URL(r.url);if(u.pathname.startsWith('/rest/')||u.pathname.startsWith('/auth/')||u.pathname.startsWith('/functions/')||u.pathname.includes('/realtime/'))return;e.respondWith(fetch(r).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put(r,clone));}return res;}).catch(()=>caches.match(r).then(c=>c||caches.match('/index.html'))));});
