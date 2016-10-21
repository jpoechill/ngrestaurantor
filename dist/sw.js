var cacheName = 'bartor-cache-v1';
var allCaches = [cacheName];
var requiredFiles = [
    '/',
    'index.html',
    'img/unsplash_dots.jpeg',
    'css/styles.min.css',
    'js/main.min.js'
];

// Installing ServiceWorker
self.addEventListener('install', function(event) {
    // openDB();

    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('[install] Caches opened, adding all core components to cache');
            return cache.addAll(requiredFiles);
        })
        .then(function() {
            console.log('[install] All required resources have been cached, we\'re good!');
            return self.skipWaiting();
        })
    );
});

// Fetching Events
self.addEventListener('fetch', function (event) {
    console.log("Made a request through the ServiceWorker for: " + event.request.url);

    // Cache first – imgs, js, support files,
    // If online – queue for update

    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Find matching request
            if (response) return response;  // From service-worker
            return fetch(event.request);    // From network
        })
    )
});

// Activating
self.addEventListener('activate', function(event) {
    console.log('[activate] Activating ServiceWorker!');
    console.log('[activate] Claiming this ServiceWorker!');

    // Delete old caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('bartor-') &&
                 !allCaches.includes(cacheName);
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
    );
});

function parseURL(url) {
    var query = url;
    var result = {};
    query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    return result.orig + result.dest;
}
