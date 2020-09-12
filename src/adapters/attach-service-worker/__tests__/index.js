import test from 'ava';
import sinon from 'sinon';
import attachServiceWorker from '../index.js';

test.beforeEach((t) => {
    const spies = { register: sinon.spy() };
    window.navigator.serviceWorker = { register: spies.register };

    const node = document.createElement('x-maria');

    t.context.run = attachServiceWorker({
        node,
        boundableAdapters: {
            run() {
                return {
                    onRender(fn) {
                        fn();
                    },
                };
            },
        },
    });
});

test.serial('It should be able to run the service worker with model;', (t) => {
    t.context.run('http://localhost:3000/worker.js', {
        name: 'Adam',
        visitedCountries: ['Russian Federation', 'Indonesia', 'Argentina'],
    });

    t.is(window.navigator.serviceWorker.register.callCount, 1);
    t.true(
        window.navigator.serviceWorker.register.calledWith(
            'http://localhost:3000/worker.js?name=Adam&visitedCountries=%5B%22Russian+Federation%22%2C%22Indonesia%22%2C%22Argentina%22%5D'
        )
    );
});

test.serial('It should be able to run the service worker with function yielding a model;', (t) => {
    t.context.run('http://localhost:3000/worker.js', () => ({
        name: 'Adam',
        visitedCountries: ['Russian Federation', 'Indonesia', 'Argentina'],
    }));

    t.is(window.navigator.serviceWorker.register.callCount, 1);
    t.true(
        window.navigator.serviceWorker.register.calledWith(
            'http://localhost:3000/worker.js?name=Adam&visitedCountries=%5B%22Russian+Federation%22%2C%22Indonesia%22%2C%22Argentina%22%5D'
        )
    );
});
