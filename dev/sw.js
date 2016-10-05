var cacheName = 'bartor-cache-v3';
var requiredFiles = [
    '/',
    'index.html',
    'img/unsplash_dots.jpeg',
    'css/styles.css',
    'js/bundle.js',
    'js/setup-sw.js',
    'js/db-controller.js',
    'js/dropdown-action.js',
    'js/lib/jquery-3.1.1.min.js',
    'js/lib/bootstrap.min.js'
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

    // Network first – times, fare, basic info
    // If offline – go to cache

    // Cache first – imgs, js, support files,
    // If online – queue for update
    // console.log("Hello 1234");

    // event.respondWith(fetch(event.request));

    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Find matching request
            if (response) {
              console.log(
                '[fetch] Returning from ServiceWorker cache: ', event.request.url
              );
              console.log("This is the response" + response);
              return response;
            }
        }).then(function(response) {
            // // Go to online server if there is no match
            console.log('[fetch] Returning from server: ', event.request.url);
            return fetch(event.request);
        }).catch(function(resposne) {
            // If offline
            console.log(parseURL(event.request.url));
            console.log("This url failed to fetch: " + event.request.url);
            console.log("Error. User is not online.")
            sayHello();
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
              return cacheName.startsWith('bartor-');
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
