const CACHE_NAME = "dsa-tracker-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  console.log("✅ Service Worker Installed");
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  console.log("✅ Service Worker Activated");
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Try network fetch, but catch errors
      return fetch(event.request).catch((err) => {
        console.warn("❌ Fetch failed:", event.request.url, err);

        // If it’s a navigation request, fallback to index.html
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }

        // Optional: serve an offline fallback page
        // return caches.match("/offline.html");

        return new Response("Offline: Resource not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      });
    })
  );
});
