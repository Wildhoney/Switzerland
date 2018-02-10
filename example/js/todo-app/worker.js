import { path } from '../../../src/middleware';

/**
 * @constant NAME
 * @type {String}
 */
const NAME = 'cache';

/**
 * @constant cachePaths
 * @type {Array}
 */
const cachePaths = [
    '/',
    `${path}/../../../js/todo-app/build.js`,
    `${path}/../../../css/default.css`,
    `${path}/../../../css/todo-app/todo-app.css`,
    `${path}/../../../css/todo-app/todo-list.css`,
    `${path}/../../../css/todo-app/todo-input.css`,
    `${path}/../../../images/todo-app/logo.png`
];

self.addEventListener('install', event => {

    event.waitUntil(caches.open(NAME).then(cache => {
        return cache.addAll(cachePaths);
    }));

});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {

    event.respondWith(fetch(event.request).then(response => {

        // Rehydrate the cache when we have access to the network.
        caches.open(NAME).then(cache => cache.put(event.request, response.clone()));
        return response.clone();

    }).catch(() => {

        return caches.match(event.request).then(response => {

            // Attempt to return the cached copy of the response, otherwise a standard 503.
            return response.clone() || new Response('Service Unavailable', { status: 503 });

        });

    }));

});
