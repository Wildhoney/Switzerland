import { path } from '../../../../../src/switzerland';

/**
 * @constant CACHE_NAME
 * @type {String}
 */
const CACHE_NAME = `iss-position`;

/**
 * @constant cacheList
 * @type {RegExp[]}
 */
const cacheList = [
    /position$/,
    /\.png$/
];

(function main(caches, worker) {

    worker.addEventListener('install', event => {

        return event.waitUntil(caches.open(CACHE_NAME).then(cache => {

            return cache.addAll([
                '/',
                '/favicon.ico',
                '/default.css',
                '/js/vendor.js',
                path('build.js'),
                path('css/default.css'),
                path('css/astronauts.css'),
                path('images/earth.jpg'),
                path('images/loading.svg')
            ]);

        }));

    });

    worker.addEventListener('fetch', event => {

        const { request } = event;

        if (request.method !== 'GET') {
            return false;
        }

        return event.respondWith(caches.open(CACHE_NAME).then(cache => {

            return fetch(request).then(networkResponse => {

                if (cacheList.some(r => r.test(request.url))) {
                    cache.put(request, networkResponse.clone());
                }

                return networkResponse;

            }).catch(() => cache.match(request));

        }));

    });

})(caches, self);