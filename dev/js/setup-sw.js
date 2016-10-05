// App-2 for installing ServiceWorker

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js', {
      scope: '.'
    }).then(function(registration) {
      console.log('The service worker has been registered ', registration);
    });
}