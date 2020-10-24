// const CACHE_NAME = "Pw Id";
// let urlsToCache = [
//     "/",
//     "/index.html",
//     "/detail.html",
//     "/nav.html",
//     "/pages/home.html",
//     "/pages/about.html",
//     "/pages/contact.html",
//     "/pages/favorit.html",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/standings.js",
//     "/js/team.js",
//     "/js/db.js",
//     "/js/idb.js",
//     "/push.js",
//     "/css/materialize.min.css",
//     "/css/style.css",
//     "/asset/images/icon.png",
//     "/manifest.json",
//     "/package.json",
//     "/package-lock.json",
//     "https://fonts.googleapis.com/icon?family=Material+Icons"
// ];

// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", event => {
//     let baseUrl = "https://api.football-data.org/v2/";

//     if(event.request.url.indexOf(baseUrl) > -1){
//         event.respondWith(
//             caches.open(CACHE_NAME).then(cache => {
//                 return fetch(event.request).then(response => {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 })
//             })
//         )
//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true })
//                 .then(response => {
//                     return response || fetch (event.request);
//                 })
//         )
//     }
// });

// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

// self.addEventListener("push", event => {
//     let body;
//     if(event.data){
//         body = event.data.text();
//     } else {
//         body = 'Push message no payload';
//     }

//     let options = {
//         body: body,
//         icon: 'asset/images/icon.png',
//         vibrate: [100, 50, 100],
//         data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         }
//     };

//     event.waitUntil(
//         self.registration.showNotification('Push Notification', options)
//     );
// })

importScripts('js/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/detail.html',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  }
], {
  ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "api",
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|css|js)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'assets'
  })
);