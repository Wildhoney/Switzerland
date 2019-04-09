const NAME = 'cache';

const cachePaths = [
    '/',
    '/nodes/todo-app/index.js',
    '/nodes/todo-input/index.js',
    '/nodes/todo-list/index.js',
    '/nodes/todo-app/images/logo.png',
    '/nodes/todo-app/styles/index.css',
    '/nodes/todo-app/styles/mobile.css',
    '/nodes/todo-input/styles/index.css',
    '/nodes/todo-input/styles/mobile.css',
    '/nodes/todo-list/styles/index.css',
    '/nodes/todo-list/styles/mobile.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(NAME).then(cache => {
            return cache.addAll(cachePaths);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                caches.open(NAME).then(cache => cache.put(event.request, response.clone()));
                return response.clone();
            })
            .catch(() => {
                return caches.match(event.request).then(response => {
                    return response.clone() || new Response('Service Unavailable', { status: 503 });
                });
            })
    );
});
