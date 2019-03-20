import { handler } from '../middleware/rescue/index.js';
import { styles } from '../middleware/html/utils.js';

/**
 * @constant meta ∷ Symbol
 * ---
 * Used internally by each Switzerland class to store private data, such as the queue and its current state.
 */
export const meta = Symbol('meta');

/**
 * @class Cancel ∷ Error
 * ---
 * Used for the `abort` function which allows the current render of a component to be cancelled, and any
 * queued items to be processed immediately afterwards.
 */
export class Cancel extends Error {}

/**
 * @constant previousProps ∷ HTMLElement e, Props p ⇒ e → p
 * ---
 * Previous props that were used for the last render of each component.
 */
const previousProps = new WeakMap();

/**
 * @constant errorHandlers ∷ HTMLElement e, Props p ⇒ e → p
 * ---
 * An incomplete set of props for a component that are used in the error recovery handler.
 */
const errorHandlers = new WeakMap();

/**
 * @function dispatchEvent ∷ ∀ a b c. HTMLElement e ⇒ e → b → Boolean → Object String c
 * ---
 * Dispatches an event, merging in the current package's version for handling legacy events
 * if/when the payloads differ from version-to-version.
 */
export const dispatchEvent = node => (name, payload, options = {}) => {
    const model = typeof payload === 'object' ? payload : { value: payload };
    return node.dispatchEvent(
        new window.CustomEvent(name, {
            bubbles: true,
            composed: true,
            ...options,
            detail: { ...model, version: 4 }
        })
    );
};

/**
 * @function getRandomId ∷ String
 * ---
 * Uses the browser-native Crypto module for generating a random ID.
 */
export const getRandomId = () => {
    const a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0].toString(16);
};

/**
 * @function parseTagName ∷ HTMLElement e ⇒ [String, e]
 * ---
 * Parses the required tag name using the optional forward-slash as a separator for specifying the prototype
 * that the custom element should extend, such as when you're extending a native element. Yields a tuple of
 * a free tag name -- which is determined recursively -- and the prototype that the custom element will extend.
 */
export const parseTagName = name => {
    const parts = name.split('/');
    return [findFreeTagName(parts[0]), determinePrototype(parts[1]), parts[1]];
};

/**
 * @function findFreeTagName ∷ String → String → String
 * ---
 * Resolves the node name by first attempting to use the requested node name, unless it already exists as
 * a custom component. If so, we recursively call the `resolveTagName` function to append a random suffix
 * to the end of the node name until we find a node that isn't registered.
 */
export const findFreeTagName = (name, suffix = null) => {
    const tag = suffix ? `${name}-${suffix}` : name;
    return !window.customElements.get(tag)
        ? tag
        : findFreeTagName(tag, getRandomId());
};

/**
 * @function getEventName ∷ String → String
 * ---
 * Prepends all event names with the '@switzerland' scope.
 */
export const getEventName = label => `@switzerland/${label}`;

/**
 * @function determinePrototype ∷ HTMLElement e ⇒ String → e
 * ---
 * Determines which constructor to extend from for the defining of the custom element. In most cases it
 * will be `HTMLElement` unless the user is extending an existing element.
 */
export const determinePrototype = tag =>
    tag ? document.createElement(tag).constructor : window.HTMLElement;

/**
 * @function consoleMessage ∷ String → String → void
 * ---
 * Takes a message and an optional console type for output. During minification this function will be removed
 * from the generated output if 'NODE_ENV' is defined as 'production', as it will be unused due to 'process.env'
 * checks later on in the code.
 */
export const consoleMessage = (text, type = 'error') =>
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);

/**
 * @function initialProps ∷ HTMLElement e, Props p ⇒ e → p → Promise (void) → p
 * ---
 * A utility function for setting all of the initial props that are used for each rendering of a component.
 * Takes the `mergeProps` which a developer can pass to the `render` method.
 */
export const initialProps = (node, mergeProps, scheduledTask) => {
    const utils = {
        dispatch: dispatchEvent(node),
        form: {},
        abort: () => {
            throw new Cancel();
        },
        getLatestProps: () => previousProps.get(node) || null,
        isIdle: () => node[meta].queue.size() <= 1,
        isResolved: async () => {
            const resolution = await Promise.race([
                scheduledTask,
                Promise.resolve(false)
            ]);
            return resolution !== false;
        }
    };

    // Signals are used for temporary data for a single render-pass.
    const prevProps = { ...(previousProps.get(node) || {}) };
    delete prevProps.signal;

    return {
        ...prevProps,
        signal: {},
        ...mergeProps,
        node,
        utils,
        render: node.render.bind(node),
        prevProps: previousProps.get(node),
        lifecycle: mergeProps.lifecycle || 'update'
    };
};

/**
 * @function cycleMiddleware ∷ HTMLElement e, Props p ⇒ e → p → [(p → Promise p|p)] → p
 * ---
 * Iterates over the defined middleware for a component, detecting if any error handlers have been
 * defined, and if so storing the current set of props up to that point. Yields the props that were
 * returned by cycling through each of the middleware functions.
 */
export const cycleMiddleware = async (node, initialProps, middleware) => {
    const props = await middleware.reduce(async (accumP, middlewareP) => {
        const props = { ...(await accumP) };
        props.props = props;
        const middleware = await middlewareP;
        const newProps = middleware(Object.freeze({ ...props }));

        // Determine if there's an error handler in the current set of props. If there is then
        // set the handler function as the default to be used if an error is subsequently thrown.
        handler in newProps && errorHandlers.set(node, newProps);
        return newProps;
    }, initialProps);

    previousProps.set(node, props);
    return props;
};

/**
 * @function handleException ∷ ∀ a. HTMLElement e ⇒ e → Error a → void
 * ---
 * Determines whether an error handler had been set for the component before it errored inside one of
 * the middleware functions. If there's a error handler then it's used -- hopefully to render something to
 * the screen, but it's not guaranteed as it merely works like a typical try-catch. If there is no error
 * handler then `console.error` is used as a last resort.
 */
export const handleException = (node, error) => {
    // Attempt to find an error handler for the current node which can handle the error gracefully.
    // Otherwise a simple yet abrasive `console.error` will be used with no recovery possible.
    const props = errorHandlers.get(node);

    if (!props) {
        consoleMessage(error);
        return;
    }

    previousProps.set(node, { ...props, error });

    return void props[handler]({
        ...props,
        error,
        render: mergeProps => {
            node[meta].state.setNormal();
            return node.render(mergeProps);
        }
    });
};

/**
 * @function cssImports ∷ HTMLElement e ⇒ e → Promise void
 * ---
 * Finds all of the component's `HTMLStyleElement` nodes and extracts the `CSSImportRule` rules, awaiting
 * the resolution of each one before resolving the yielded promise.
 */
export const cssImports = node =>
    styles.has(node) ? Promise.all([...styles.get(node)]) : Promise.resolve();

/**
 * @function getDefaults ∷ ∀ a. Object String (String → a)
 */
export const getDefaults = types =>
    Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined'
                ? { ...accum, [key]: value[1] }
                : accum,
        {}
    );

/**
 * @function toCamelcase ∷ String → String
 */
export const toCamelcase = value => {
    const f = separator => () => {
        const r = new RegExp(`(${separator}\\w)`, 'g');
        return value.replace(r, match => match[1].toUpperCase());
    };
    return {
        fromKebab: f('-'),
        fromSnake: f('_')
    };
};

/**
 * @function findBoundary ∷ { HTMLElement, ShadowRoot|void } → ShadowRoot|HTMLElement
 */
export const findBoundary = ({ node, boundary }) =>
    boundary || (node[meta] && node[meta].boundary) || node;
