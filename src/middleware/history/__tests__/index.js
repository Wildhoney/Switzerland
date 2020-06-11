import test from 'ava';
// import withComponent from 'ava-webcomponents';
import sinon from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import { getWindow } from '../../../utils.js';
import * as type from '../../../types/index.js';
import history, { nodes } from '../index.js';

test.serial('It should register the events to notify changes only once;', async (t) => {
    t.plan(2);

    const window = await getWindow();
    const { node } = defaultProps;
    node.render = sinon.spy();
    const m = history();

    // Attempt to register the same node multiple times...
    m(defaultProps);
    m(defaultProps);
    m(defaultProps);

    try {
        return new Promise((resolve) => {
            window.addEventListener('popstate', () => {
                t.is(node.render.callCount, 1);

                t.true(
                    node.render.calledWith({
                        signal: {
                            history: {
                                params: sinon.match.any,
                                pathname: sinon.match.string,
                                hash: sinon.match.string,
                            },
                        },
                    })
                );
                resolve();
            });
        });
    } finally {
        const event = new window.PopStateEvent('popstate');
        window.dispatchEvent(event);
    }
});

test('It should be able to parse params/hash and set defaults;', (t) => {
    const mockLocation = {
        hash: '#test-me',
        search: '?age=33&location=Watford',
    };
    const m = history(
        {
            name: [type.String, 'Adam'],
            age: type.Int,
            dateOfBirth: [type.Date, new Date('10-10-1985')],
        },
        mockLocation
    );
    const props = m(defaultProps);
    t.is(props.history.params.get('name'), 'Adam');
    t.is(props.history.params.get('age'), 33);
    t.is(props.history.params.get('location'), 'Watford');
    t.is(props.history.params.get('date_of_birth').toLocaleDateString('en-GB'), '10/10/1985');
});

test('It should be able to push and replace the URL state;', (t) => {
    window.history.pushState = sinon.spy();
    window.history.replaceState = sinon.spy();
    const m = history();
    const props = m(defaultProps);
    props.history.pushState();
    t.is(window.history.pushState.callCount, 1);
    t.is(window.history.replaceState.callCount, 0);
    props.history.replaceState();
    t.is(window.history.pushState.callCount, 1);
    t.is(window.history.replaceState.callCount, 1);
});

test('It should be able to remove the node from the map when unmounting;', (t) => {
    const m = history();
    m(defaultProps);
    t.true(nodes.has(defaultProps.node));
    m({ ...defaultProps, lifecycle: 'unmount' });
    t.false(nodes.has(defaultProps.node));
});

test('It should be able to gracefully handle being rendered to a string by passing explicit params;', async (t) => {
    const search = { message: 'Example' };
    const location = { search };
    const component = create(
        'x-example',
        history({ example: type.String }, location),
        m.html(({ history, h }) => h('div', {}, history.params.get('message')))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});

test('It should be able to gracefully handle being rendered to a string from the URL parameters;', async (t) => {
    const component = create(
        'x-example',
        m.window('https://www.example.org?message=Example'),
        history({ example: type.String }),
        m.html(({ history, h }) => h('div', {}, history.params.get('message')))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});

// test.skip(
//     'It should be able to render the node and update with the merge props and respond to events;',
//     withComponent(`${__dirname}/helpers/mock.js`),
//     async (t, { page, utils }) => {
//         const name = 'x-example';
//         await utils.waitForUpgrade(name);

//         await page.evaluate((name) => {
//             const node = document.createElement(name);
//             document.body.append(node);
//             return node.idle();
//         }, name);

//         t.snapshot(await utils.innerHTML(name));

//         await page.click(`${name} a.params`);
//         t.snapshot(await utils.innerHTML(name));

//         await page.goBack();
//         t.snapshot(await utils.innerHTML(name));

//         await page.click(`${name} a.hash`);
//         t.snapshot(await utils.innerHTML(name));
//     }
// );
