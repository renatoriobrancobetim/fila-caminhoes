const CACHE_NAME = "motoristas-pwa-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "motoristas.html",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {

  // 🔥 IGNORA requisições do Firebase
  if (event.request.url.includes("firestore.googleapis.com") ||
      event.request.url.includes("firebase") ) {
    return;
  }

});

