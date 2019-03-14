import test from 'ava';
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
