import test from 'ava';
import * as u from '../utils.js';

test('It should be able to put and take from the tree;', t => {
    const node = document.createElement('time');
    const view = Symbol('mock-view');
    t.is(u.putTree(node, view), undefined);
    t.is(u.takeTree(node), view);
    t.is(u.takeTree({}), undefined);
});

test('It should be able to transform strings into kebab form;', t => {
    t.is(u.toKebab('test'), 'test');
    t.is(u.toKebab('testMe'), 'test-me');
    t.is(u.toKebab('anotherTestMe'), 'another-test-me');
});

test('It should be able to handle stylesheets and add promise to map;', async t => {
    t.plan(6);

    async function isResolved(promise) {
        const unresolved = 'unresolved';
        const result = await Promise.race([promise, Promise.resolve(unresolved)]);
        return result === unresolved;
    }

    return Promise.all(
        ['onload', 'onerror'].map(async method => {
            const node = document.createElement('section');
            const tree = u.sheet(node)('example.css');

            tree.props.oncreate();
            const map = u.styles.get(node);
            t.is(map.size, 1);

            const promise = Array.from(map)[0];
            t.true(await isResolved(promise));

            tree.props[method]();
            t.false(await isResolved(promise));
        })
    );
});

test('It should be a able to handle the insertion of CSS variables', t => {
    const config = {
        animationDuration: 0.5,
        type: 'ease-in'
    };
    const tree = u.vars(config);
    t.is(tree.children[0].name, ':host {  --animation-duration: 0.5; --type: ease-in; }');
});
