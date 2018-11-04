 
var staticCacheName = 'restaurant-cahce-1';

let urlToCache = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './js/sw_registration.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',

];
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(staticCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlToCache);
      })
  );
});
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


/**
 * Fetching for offline content viewing
 */


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('restaurant-cahce-1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
