import test from 'ava';
import { spy, stub, match } from 'sinon';
import * as m from '../middleware.js';
import * as u from '../utils.js';

test.beforeEach(t => {
    const node = document.createElement('div');
    const template = document.createElement('template');
    const images = [
        document.createElement('img'),
        document.createElement('img'),
        document.createElement('img')
    ];
    images.forEach(image => template.content.appendChild(image));
    node.appendChild(template);

    t.context.node = node;
    t.context.template = template;

    t.context.createBoundary = () => {
        const boundary = node.attachShadow({ mode: 'open' });
        const track = document.createElement('div');
        track.classList.add('track');
        boundary.appendChild(track);
        return { boundary, track };
    };
});

test('It should be able to initialise the variables;', t => {
    const props = { node: t.context.node, adapt: null };
    props.props = props;

    t.deepEqual(m.computeVariables(props), {
        ...props,
        count: 3,
        width: 0,
        height: 0
    });

    t.deepEqual(m.computeVariables({ ...props, adapt: { width: 100, height: 150 } }), {
        ...props,
        count: 3,
        width: 100,
        height: 150
    });
});

test('It should be able to import the template;', t => {
    const { boundary, track } = t.context.createBoundary();
    const props = { node: t.context.node, boundary };
    props.props = props;

    const newProps = m.importTemplate(props);
    t.is(Array.from(track.querySelectorAll('img')).length, 3);
    t.deepEqual(newProps, props);
});

test('It should be able to observe the template for changes;', t => {
    window.MutationObserver = function(f) {
        f();
    };
    const observeSpy = (window.MutationObserver.prototype.observe = spy());

    const utils = { getLatestProps: spy(() => ({ attrs: { index: 1 } })) };
    const { boundary } = t.context.createBoundary();
    const props = { node: t.context.node, boundary, utils };
    props.props = props;

    {
        const newProps = m.observeTemplate(props);
        t.deepEqual(newProps, props);
        t.is(utils.getLatestProps.callCount, 1);
        t.is(observeSpy.callCount, 1);
        t.true(observeSpy.calledWith(t.context.template.content, match.object));
        t.is(Number(t.context.node.getAttribute('index')), 1);
    }

    {
        const utils = { getLatestProps: spy(() => ({ attrs: { index: 3 } })) };
        const props = { node: t.context.node, boundary, utils };
        props.props = props;
        m.observeTemplate(props);
        t.is(Number(t.context.node.getAttribute('index')), 2);
    }
});

test('It should be able to update the scroll position;', t => {
    const isTouchableStub = stub(u, 'isTouchable').callsFake(() => true);
    const { boundary, track } = t.context.createBoundary();
    const scrollSpy = (track.scroll = spy());
    const defaultProps = {
        node: t.context.node,
        boundary,
        width: 100,
        height: 150,
        attrs: { direction: 'horizontal', index: 2 }
    };

    {
        const props = defaultProps;
        props.props = props;
        const newProps = m.updatePosition(props);
        t.deepEqual(newProps, props);
        t.true(scrollSpy.calledWith(100 * 2, 0));
    }

    {
        const props = {
            ...defaultProps,
            attrs: { direction: 'vertical', index: 3 }
        };
        props.props = props;
        const newProps = m.updatePosition(props);
        t.deepEqual(newProps, props);
        t.true(scrollSpy.calledWith(0, 150 * 3));
    }

    isTouchableStub.reset();
});

test('It should be able to dispatch the event when index is mutated;', t => {
    const dispatchSpy = spy();

    const defaultProps = {
        node: t.context.node,
        attrs: { index: 2 },
        signal: {},
        utils: { dispatch: dispatchSpy }
    };

    {
        const props = defaultProps;
        props.props = props;
        const newProps = m.dispatchEvent(props);
        t.deepEqual(newProps, props);
        t.is(dispatchSpy.callCount, 0);
    }

    {
        const mutations = [{ attributeName: 'not-index' }];
        const props = { ...defaultProps, signal: { mutations } };
        props.props = props;
        const newProps = m.dispatchEvent(props);
        t.deepEqual(newProps, props);
        t.is(dispatchSpy.callCount, 0);
    }

    {
        const mutations = [{ attributeName: 'index' }];
        const props = { ...defaultProps, signal: { mutations } };
        props.props = props;
        const newProps = m.dispatchEvent(props);
        t.deepEqual(newProps, props);
        t.is(dispatchSpy.callCount, 1);
        t.true(dispatchSpy.calledWith('change', 2));
    }
});
