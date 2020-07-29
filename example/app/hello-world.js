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

async function controller({ render, adapter, node, ...props }) {
    adapter.attachShadow();

    // const path = await adapter.getPath(import.meta.url);
    const attrs = adapter.parseAttributes({ name: t.String });

    return { name: attrs.name, render, node };

    // factory.attachShadow();

    // const attrs = factory.parseAttrs({ values: t.Array(t.String) });
    // const state = factory.newState(container, initialState);

    // return { attrs, path, state };
}

function view({ name, node }) {
    return h('section', {}, [
        h('h1', {}, `Hello ${name}!`),
        h('button', { onClick: () => node.setAttribute('name', 'Adam') }, 'Say Hi to Adam'),
        h('button', { onClick: () => node.setAttribute('name', 'Maria') }, 'Say Hi to Maria'),
        h('button', { onClick: () => node.setAttribute('name', 'Imogen') }, 'Say Hi to Imogen'),
    ]);
}

export default create('x-hello-world', controller, view);
