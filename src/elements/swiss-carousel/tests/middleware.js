import test from 'ava';
import { stub } from 'sinon';
import * as m from '../middleware.js';

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

    t.deepEqual(
        m.computeVariables({ ...props, adapt: { width: 100, height: 150 } }),
        { ...props, count: 3, width: 100, height: 150 }
    );
});

test('It should be able to import the template;', t => {
    const boundary = t.context.node.attachShadow({ mode: 'open' });
    const track = document.createElement('div');
    track.classList.add('track');
    boundary.appendChild(track);

    const props = { node: t.context.node, boundary };
    props.props = props;

    const newProps = m.importTemplate(props);
    t.is(Array.from(track.querySelectorAll('img')).length, 3);
    t.deepEqual(newProps, props);
});

// test.serial('It should be able to observe the template for changes;', t => {
//     let mutationObserverStub;
//     const importTemplateStub = stub(m, 'importTemplate');

//     window.MutationObserver = class {
//         constructor(f) {
//             mutationObserverStub = f;
//         }
//         observe() {}
//     };

//     const props = { node: t.context.node };
//     props.props = props;
//     const newProps = m.observeTemplate(props);

//     console.log(mutationObserverStub);
//     importTemplateStub.reset();
// });
