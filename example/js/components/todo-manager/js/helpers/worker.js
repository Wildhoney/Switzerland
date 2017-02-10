import path from '../../../../../../src/helpers/path';

const NAME = 'cache';

/**
 * @constant cachePaths
 * @type {Array}
 */
const cachePaths = [
    '/',
    '/favicon.ico',
    '/css/default.css',
    '/images/logo.png',
    path('build.js'),
    path('../css/todo-add.css'),
    path('../css/todo-list.css'),
    path('../css/todo-manager.css')
];

self.addEventListener('install', event => {

    event.waitUntil(caches.open(NAME).then(cache => {
        return cache.addAll(cachePaths);
    }));

});

self.addEventListener('fetch', event => {

    event.respondWith(caches.match(event.request).then(cached => {

        const networked = fetch(event.request).then(response => {

            // Rehydrate the cache when we have access to the network.
            caches.open(NAME).then(cache => cache.put(event.request, response.clone()));

            return response.clone();

        }).catch(() => {

            // Yield a 503 if the network is currently unavailable.
            return new Response('Service Unavailable', { status: 503 });

        });

        return cached || networked;

    }));

});
