// Här sätter jag upp min servvice worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "home.html",
        "home.js",
        "gallery.html",
        "gallery.js",
        "camera-icon_144x144.png",
        "camera-icon-21.png",
        "manifest.json",
        "service-worker.js",
        "style.css",
      ]); //Kan lägga in allt möjligt här som jag vill ska sparas och köras på offline
    })
  );
  self.skipWaiting();
  console.log("Service worker installed!", new Date().toLocaleTimeString());
});

self.addEventListener("activate", (event) => {
  self.skipWaiting();
  console.log("Service worker is activated!", new Date().toLocaleTimeString());
});

self.addEventListener("fetch", async (event) => {
  console.log(event.request.url); // Här skriver jag ut url'en på varje nätverksförfrågan
  if (navigator.onLine) {
    console.log("We are online baby!");
  } else {
    console.log("You are offline....");
    event.respondWith(
      caches.match(event.request).then((response) => {
        console.log("response", response);
        if (response) return response;
        else return caches.match(new Request("offline.html"));
      })
    );
  }
});

async function updateCache(request) {
  const response = await fetch(request);
  const cache = await caches.open("v1");

  cache.put(request, response.clone());

  return response;
}
