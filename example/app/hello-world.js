import { create, h } from 'switzerland';

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

function controller({ node, lifecycle, render, factory }) {
    return { name: 'Adam' };

    // factory.attachShadow();

    // const path = factory.getPath(import.meta.url);
    // const attrs = factory.parseAttrs({ values: t.Array(t.String) });
    // const state = factory.newState(container, initialState);

    // return { attrs, path, state };
}

function view({ name }) {
    return h('section', {}, [
        h('h1', {}, `Hello ${name}!`),
        h('button', { onClick: () => console.log(`Hi ${name}!`) }, 'Say Hi!'),
    ]);
}

export default create('x-hello-world', controller, view);
