const states = new WeakMap();

/**
 * @function useMethods
 * ---
 * Mimicks the super useful and simple `useMethods` hook from the `react-use` library which allows
 * for a Redux style reducer without the individual actions and action types. Requires you to pass
 * the `createMethods` object which contains a list of action functions, and the `initialState` of
 * the store.
 */
export default function useMethods({ node, lifecycle, render }) {
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
