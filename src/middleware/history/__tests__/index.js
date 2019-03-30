import test from 'ava';
import withComponent from 'ava-webcomponents';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { getEventName } from '../../../core/utils.js';
import * as type from '../../../types/index.js';
import history from '../index.js';

test('It should register the events to notify changes only once;', async t => {
    t.plan(1);

    const { node } = defaultProps;
    node.render = spy();

    const eventName = getEventName('update-state');
    const m = history();

    // Attempt to register the same node multiple times...
    m(defaultProps);
    m(defaultProps);
    m(defaultProps);

    try {
        return new Promise(resolve => {
            window.addEventListener(eventName, () => {
                t.is(node.render.callCount, 1);
                resolve();
            });
        });
    } catch {
    } finally {
        window.dispatchEvent(
            new window.CustomEvent(eventName, {
                detail: {}
            })
        );
    }
});

test('It should be able to parse params/hash and set defaults;', t => {
    const mockLocation = {
        hash: '#test-me',
        search: '?age=33&location=Watford'
    };
    const m = history(
        {
            name: [type.String, 'Adam'],
            age: type.Int,
            dateOfBirth: [type.Date, new Date('10-10-1985')]
        },
        mockLocation
    );
    const props = m(defaultProps);
    t.is(props.history.hash, '#test-me');
    t.is(props.history.params.get('name'), 'Adam');
    t.is(props.history.params.get('age'), 33);
    t.is(props.history.params.get('location'), 'Watford');
    t.is(
        props.history.params.get('date_of_birth').toLocaleDateString('en-GB'),
        '10/10/1985'
    );
});

test('It should be able to push and replace the URL state;', t => {
    window.history.pushState = spy();
    window.history.replaceState = spy();
    const m = history();
    const props = m(defaultProps);
    props.history.push();
    t.is(window.history.pushState.callCount, 1);
    t.is(window.history.replaceState.callCount, 0);
    props.history.replace();
    t.is(window.history.pushState.callCount, 1);
    t.is(window.history.replaceState.callCount, 1);
});

test(
    'It should be able to render the node and update with the merge props and respond to events;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const getMarkup = (name, ageDescription, age) => {
            const ageText = age ? ` at ${age}` : '';
            return `<main><div>Hola ${name}! You are ${ageDescription}${ageText}.</div><a class="params">Click!</a><a class="hash">Click!</a></main>`;
        };

        const getHTML = () =>
            page.evaluate(() => document.querySelector('x-example').innerHTML);

        await utils.waitForUpgrade('x-example');
        await page.evaluate(() => {
            const node = document.createElement('x-example');
            document.body.append(node);
            return node.idle();
        });

        t.is(await getHTML(), getMarkup('Adam', 'old'));

        await page.click('x-example a.params');
        t.is(await getHTML(), getMarkup('Maria', 'young'));

        await page.goBack();
        t.is(await getHTML(), getMarkup('Adam', 'old'));

        await page.click('x-example a.hash');
        t.is(await getHTML(), getMarkup('Adam', 'old', 33));
    }
);
