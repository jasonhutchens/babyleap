/* eslint-env serviceworker */

var CACHE_NAME = 'babyleap-cache-v1'
var urlsToCache = [
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.info('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('activate', function (event) {
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response
        }
        return self.fetch(event.request)
      }
    )
  )
})
