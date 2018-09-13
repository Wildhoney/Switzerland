import test from 'ava';
import { spy, match } from 'sinon';
import { init, create, alias } from '../index.js';

test.beforeEach(t => {
    t.context.get = spy();
    t.context.define = spy();
    window.crypto = { getRandomValues: () => {} };
    window.customElements = {
        get: tag => {
            t.context.get(tag);
            return tag === 'x-neptune' ? class {} : null;
        },
        define: (tag, blueprint) => t.context.define(tag, blueprint)
    };
});

test.afterEach(() => {
    window.crypto = undefined;
    window.customElements = undefined;
});

test('It should be able to handle the relative paths correctly;', t => {
    const path = init('https://localhost:3000/nodes/earth/planets.js');
    t.is(path('../mercury.js'), '/nodes/mercury.js');
    t.is(path('../../venus.js'), '/venus.js');
    t.is(path('jupiter.js'), '/nodes/earth/jupiter.js');
    t.is(path('saturn/uranus.js'), '/nodes/earth/saturn/uranus.js');
    t.is(path('../saturn/neptune/pluto.js'), '/nodes/saturn/neptune/pluto.js');
});

test('It should yield the defined tag name when creating a custom element;', t => {
    t.is(create('x-mercury'), 'x-mercury');
    t.is(t.context.define.callCount, 1);
    t.true(t.context.define.calledWith('x-mercury', match.any));
});

test('It should yield the defined tag name when aliasing an existing element;', t => {
    t.is(alias('x-neptune', 'x-mars'), 'x-mars');
    t.is(t.context.get.callCount, 1);
    t.is(t.context.define.callCount, 1);
    t.true(t.context.get.calledWith('x-neptune'));
    t.true(t.context.define.calledWith('x-mars', match.any));
});
