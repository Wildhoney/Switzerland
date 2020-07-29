import { create, h, t } from 'switzerland';

const getInitialState = (name) => ({
    name,
});

function createMethods(state) {
    return {
        changeName(name) {
            return { ...state, name };
        },
    };
}

async function controller({ adapter }) {
    adapter.attachShadow();

    const attrs = adapter.parseAttributes({ name: t.String });
    const [state, methods] = adapter.newState(createMethods, getInitialState(attrs.name));

    adapter.registerMethods({ setName: methods.changeName });

    return { state, methods };
}

function view({ state, methods, dispatch, node }) {
    return h('section', {}, [
        h('h1', {}, `Hello ${state.name}!`),

        h('button', { onClick: () => methods.changeName('Adam') }, 'Say Hi to Adam'),
        h('button', { onClick: () => methods.changeName('Maria') }, 'Say Hi to Maria'),
        h('button', { onClick: () => methods.changeName('Imogen') }, 'Say Hi to Imogen'),
    ]);
}

export default create('x-hello-world', controller, view);
