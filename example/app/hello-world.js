import { create, h, t } from 'switzerland';

// function controller({ node, lifecycle, render, factory }) {
//     factory.attachShadow();

//     const path = factory.getPath(import.meta.url);
//     const attrs = factory.parseAttrs({ values: t.Array(t.String) });
//     const state = factory.newState(container, initialState);

//     return { attrs, path, state };
// }

// export default create('x-countries', controller, ({ attrs, path, state }) => {
//     return (
//         h(utils.node.Sheet, { href: path('index.css') }),
//         h('section', {}, [
//             h(
//                 'ul',
//                 {},
//                 attrs.values.map((country) => h('li', {}, country))
//             ),
//         ])
//     );
// });

const initialState = {
    count: 0,
};

function createMethods(state) {
    return {
        reset() {
            return initialState;
        },
        increment() {
            return { ...state, count: state.count + 1 };
        },
        decrement() {
            return { ...state, count: state.count - 1 };
        },
    };
}

async function controller({ render, adapter, node, ...props }) {
    adapter.attachShadow();

    // const path = await adapter.getPath(import.meta.url);
    const attrs = adapter.parseAttributes({ name: t.String });
    const [state, methods] = adapter.newState(createMethods, initialState);

    return { name: attrs.name, render, node, state, methods };
}

function view({ name, node, state, methods }) {
    return h('section', {}, [
        h('button', { onClick: methods.decrement }, '-'),
        h('div', {}, state.count ?? '?'),
        h('button', { onClick: methods.increment }, '+'),
        h('button', { onClick: methods.reset }, 'Reset!'),

        h('hr'),

        h('h1', {}, `Hello ${name}!`),
        h('button', { onClick: () => node.setAttribute('name', 'Adam') }, 'Say Hi to Adam'),
        h('button', { onClick: () => node.setAttribute('name', 'Maria') }, 'Say Hi to Maria'),
        h('button', { onClick: () => node.setAttribute('name', 'Imogen') }, 'Say Hi to Imogen'),
    ]);
}

export default create('x-hello-world', controller, view);
