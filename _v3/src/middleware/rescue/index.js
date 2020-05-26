export const handler = Symbol('error');

/**
 * @function rescue ∷ View v, Props p ⇒ v → (p → p)
 * ---
 * Takes a list of middleware which includes one or more 'html' middleware items, and renders into the component
 * whenever an exception is raised in the processing of the middleware. If the 'rescue' middleware has not been
 * defined on the component, then a console error will be rendered instead, but only in development mode.
 */
export default (getView) => {
    return async function rescue(props) {
        return { ...props, [handler]: await getView };
    };
};
