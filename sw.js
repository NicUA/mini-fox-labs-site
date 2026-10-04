const CACHE = "minifox-v7";
const CORE = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./support.html",
  "./changelog.html",
  "./privacy.html",
  "./terms.html",
  "./favicon.png",
  "./og-image.jpg",
  "./ai-studio/",
  "./ai-studio.css",
  "./ai-studio.js",
  "./studio-content.js"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).catch(() => Promise.resolve())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
