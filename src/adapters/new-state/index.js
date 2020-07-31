const states = new WeakMap();

export default function newState({ node, lifecycle, render }) {
    return (createMethods, initialState) => {
        if (!states.has(node)) {
            const methods = Object.keys(createMethods(initialState)).reduce((accum, name) => {
                return {
                    ...accum,
                    [name]: async (...args) => {
                        const currentState = states.get(node);
                        const newState = await createMethods(currentState[0])[name](...args);
                        states.set(node, [newState, currentState[1]]);
                        render();
                    },
                };
            }, {});

            states.set(node, [initialState, methods]);
        }

        lifecycle === 'unmount' && states.delete(node);

        return states.get(node) ?? [{}, {}];
    };
}
