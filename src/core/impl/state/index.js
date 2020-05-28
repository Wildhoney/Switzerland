/**
 * @constant states
 */
const states = new WeakMap();

/**
 * @constant normal
 */
const normal = Symbol('normal');

/**
 * @constant error
 */
const error = Symbol('error');

/**
 * @function createState
 * ---
 * Simple state management for each custom component, whereby an errored component cannot recover
 * without the `render` method being invoked from the error handler. Prevents the developer from
 * ignoring errors thrown by components, and instead allows them to present a message to the user
 * for recovery.
 */
export default function createState(node) {
    states.set(node, normal);

    return {
        isError: () => states.get(node) === error,
        setNormal: () => states.set(node, normal),
        setError: () => states.set(node, error),
    };
}
