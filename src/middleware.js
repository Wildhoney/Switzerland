import { patch } from 'picodom';
import parseUrls from 'css-url-parser/lib/css-parser';
import { eventName, translate } from './switzerland';

/**
 * @constant errorHandlers :: Props p => WeakMap (p -> p)
 * @type {WeakMap}
 */
export const errorHandlers = new WeakMap();

/**
 * @constant resizeObserver :: ResizeObserver
 * @type {ResizeObserver}
 */
const resizeObserver = window.ResizeObserver && new window.ResizeObserver(entries => {
    entries.forEach(entry => entry.target.render({ adapt: entry }));
});

/**
 * @constant intersectionObserver :: IntersectionObserver
 * @type {IntersectionObserver}
 */
const intersectionObserver = window.IntersectionObserver && new window.IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.render({ intersection: entry }));
});

/**
 * @constant ONCE :: Object String
 * @type {Object}
 */
export const ONCE = {
    ONLY: Symbol('only'),
    ON_MOUNT: Symbol('mount'),
    ON_UNMOUNT: Symbol('unmount')
};

/**
 * @constant registry :: WeakMap HTMLElement
 * @type {WeakMap}
 */
const registry = new WeakMap();

/**
 * @method sendEvent
 * @param {String} name
 * @param {Object} payload
 * @return {void}
 */
export function sendEvent(name, payload) {

    payload.node.dispatchEvent(new CustomEvent(name, {
        detail: payload,
        bubbles: true,
        composed: true
    }));

}

/**
 * @method putState :: Tree t, Props p => HTMLElement -> t -> HTMLElement -> p -> void
 * @param {Object} tree
 * @param {Object} root
 * @param {Object} prevProps
 * @return {void}
 */
function putState(node, tree, root, prevProps) {
    registry.set(node, { prevProps, vDomTree: { tree, root } });
}

/**
 * @method takeVDomTree :: Tree t => HTMLElement -> t|null
 * @param {HTMLElement} node
 * @return {Object|null}
 */
function takeVDomTree(node) {
    const state = Object(registry.get(node));
    return state.vDomTree || null;
}

/**
 * @method takePrevProps :: Props p => HTMLElement -> p|null
 * @param {HTMLElement} node
 * @return {Object|null}
 */
export function takePrevProps(node) {
    const state = Object(registry.get(node));
    return state.prevProps || null;
}

/**
 * @method kebabToCamel :: String -> String
 * @param {String} value
 * @return {String}
 */
function kebabToCamel(value) {
    return value.replace(/(-\w)/g, match => match[1].toUpperCase());
}

/**
 * @method escapeRegExp :: String -> String
 * @param {String} value
 * @return {String}
 */
function escapeRegExp(value) {
    return value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

/**
 * @constant path :: String
 * @type {String}
 */
export const path = document.currentScript.getAttribute('src').split('/').slice(0, -1).join('/');

/**
 * @method intersect :: Props p => (p -> p)
 * @return {Function}
 */
export function intersect() {

    const cache = new WeakSet();

    return props => {

        !cache.has(props.node) && do {
            cache.add(props.node);
            intersectionObserver && intersectionObserver.observe(props.node);
        };

        return props;

    };

}

/**
 * @method adapt :: Props p => (p -> p)
 * @return {Function}
 * @see https://github.com/marcj/css-element-queries
 *
 * Hooks up the host node to the `ResizeObserver` observer which allows for element queries where components are
 * re-rendered whenever their dimensions change, rather than when the page's dimension changes. This allows for
 * responsiveness on an element-level, where for example an element is placed in a 200px space it can render
 * differently than when it's placed in a 400px space.
 */
export function adapt() {

    const cache = new WeakSet();

    return props => {

        !cache.has(props.node) && do {
            cache.add(props.node);
            resizeObserver && resizeObserver.observe(props.node);
        };

        return props;

    };

}

/**
 * @method attrs :: Props p => [String] -> (p -> p)
 * @param {Array<String>} [exclude = ['class', 'id']]
 * @return {Function}
 *
 * Takes an optional list of excluded attributes that will be ignored when their values are mutated, such as you
 * may not want the component to re-render when class names are modified, such as the "resolved" class name that
 * Switzerland adds when a component has been resolved.
 *
 * The 'attrs' middleware parses all of the attributes defined on the host node, and augments the passed props with
 * their values. It also observes the attributes using the 'MutationObserver' to re-render the component when any
 * of the non-excluded attributes are modified.
 */
export function attrs(exclude = ['class', 'id', 'style']) {

    const observers = new Map();

    return props => {

        if (!observers.has(props.node)) {

            const observer = new MutationObserver(mutations => {

                mutations.some(mutation => {

                    // Only cause a re-render if some of the mutated items have actually changed the attribute
                    // when compared, and are not included in the `exclude` list specified in the function's
                    // parameters.
                    const isObserved = !exclude.includes(mutation.attributeName);
                    const isModified = mutation.oldValue !== props.node.getAttribute(mutation.attributeName);
                    return isObserved && isModified;

                }) && props.render();

            });

            observer.observe(props.node, { attributes: true, attributeOldValue: true });
            observers.set(props.node, observer);

        }

        const attrs = Object.keys(props.node.attributes).reduce((acc, index) => {
            const attr = props.node.attributes[index];
            return { ...acc, [kebabToCamel(attr.nodeName)]: attr.nodeValue };
        }, {});

        return { ...props, attrs };

    };

}

/**
 * @method html :: Tree t, Props p => (void -> t) -> (p -> p)
 * @param {Function} getTree
 * @return {Function}
 * @see https://github.com/picodom/picodom
 *
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export function html(getTree) {

    /**
     * @method transform
     * @param {Object|String} tree
     * @return {Object|String}
     */
    function transform(tree) {

        return Array.isArray(tree) ? tree.map(transform) : do {
            const isObject = 'type' in Object(tree);
            const newTree = (isObject && tree.type.startsWith('_')) ? { ...tree, type: translate(tree.type) } : tree;
            isObject ? { ...newTree, children: transform(tree.children), props: attributes(tree.type, tree.props) } : newTree;
        };

    }

    /**
     * @method attributes
     * @param {String} type
     * @param {Object} data
     * @return {Object}
     */
    function attributes(type, data) {

        /**
         * @method isFunction
         * @param {*} x
         * @return {Boolean}
         */
        const isFunction = x => typeof x === 'function';

        return Object.entries(data).reduce((accum, [key, value]) => {

            const events = new Set();
            const noop = { ...accum, [key]: value };

            /**
             * @method isNative
             * @param {String} type
             * @return {Boolean}
             *
             * Determine whether the registered event is a standard DOM event, such as onClick, onChange, etc...
             * If it is then we'll ignore it and let the browser handle it natively.
             */
            function isNative(type) {
                return document.createElement(type)[key] === null;
            }

            /**
             * @method onCreate
             * @param {HTMLElement} node
             * @return {void}
             */
            function onCreate(node) {
                isFunction(data.oncreate) && data.oncreate(node);
                events.forEach(({ key, value }) => node.addEventListener(key, value));
            }

            /**
             * @method onRemove
             * @param {HTMLElement} node
             * @return {void}
             */
            function onRemove(node) {
                isFunction(data.onremove) && data.onremove(node);
                events.forEach(({ key, value }) => node.removeEventListener(key, value));
            }

            return (key.startsWith('on') && isFunction(value) && !isNative(type)) ? do {

                // Add the event to be invoked upon the creating of the DOM element, and then append the `oncreate`
                // and `onremove` hooks to the node's data.
                events.add({ key: key.replace(/^on/i, ''), value });
                ({ ...noop, oncreate: onCreate, onremove: onRemove });

            } : noop;

        }, {});

    }

    return async props => {

        if (props.node.isConnected) {

            // Compute the current dimensions of the host node.
            const { offsetHeight, offsetWidth } = props.node;
            const updatedProps = { ...props, dimensions: { height: offsetHeight, width: offsetWidth } };

            // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
            const previous = takeVDomTree(props.node) || {};
            const tree = transform(await getTree({ ...updatedProps }));
            const root = patch(previous.tree, tree, props.boundary);

            // Save the virtual DOM state for cases where an error short-circuits the chain.
            putState(props.node, tree, root, props);

            // Append the document fragment to the shadow root if we have one.
            !(props.boundary instanceof ShadowRoot) && props.node.appendChild(props.boundary);

        }

        return props;

    };

}

/**
 * @method include :: Props p => [String] -> (p -> p)
 * @param {Array<String>} files
 * @return {Function}
 *
 * Takes a list of relative CSS files, reads their contents, concatenates them, and appends the
 * generated <style /> node to the shadow boundary of the component.
 *
 * Using the 'include' middleware also updates the paths specified in the CSS to make them relative to the
 * component's path, which allows you to create isolated components that are unaware of where they live in
 * the overall application.
 *
 * The CSS documents are also cached, and so mounting a component multiple times in the DOM will only incur
 * a single AJAX request for each listed CSS document.
 */
export function include(...files) {

    const key = files.join('');
    const cache = new Map();

    return async props => {

        if (!props.boundary.querySelector('style')) {

            const content = cache.has(key) ? cache.get(key) : do {

                const content = files.reduce(async (accumP, _, index) => {

                    const result = await fetch(`${path}/${files[index]}`).then(r => r.text());
                    const urls = parseUrls(result);
                    const css = urls.length ? urls.map(url => {
                        return result.replace(new RegExp(escapeRegExp(url), 'ig'), `${path}/${url}`);
                    }).join() : result;

                    return `${css} ${await accumP}`;

                }, '');

                cache.set(key, content);
                content;

            };

            const style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.innerHTML = await content;
            props.boundary.appendChild(style);

        }

        return props;

    };

}

/**
 * @method methods :: Props p => Object String (p -> *) -> (p -> p)
 * @param {Object} fns
 * @return {Function}
 *
 * Takes a map of function names to functions, and attaches them to the node, which allows you to directly
 * invoke the functions once you have a reference to the node. Using the 'methods' middleware passes the arguments
 * as-is, but also passes the current set of props as the final argument.
 */
export function methods(fns) {

    return props => {

        Object.entries(fns).forEach(([name, fn]) => {
            props.node[name] = (...args) => (fn.call(props.node, ...args, props));
        });

        return props;

    };

}

/**
 * @method once :: Props p => (p -> p) -> Symbol -> (p -> p)
 * @param {Function} fn
 * @param {Symbol} [strategy = ONCE.ONLY]
 * @return {Function}
 *
 * Takes a function and an optional strategy that allows for the passed function to be invoked only once per instance
 * of the component, which is useful for one-off functionality, such as being used as a constructor or initialiser, or
 * cleaning up when the node is removed from DOM.
 *
 * With the optional second parameter you can specify the strategy:
 *
 *  - ONCE.ONLY: Default functionality which invokes the supplied function once and once only.
 *  - ONCE.ON_MOUNT: Invokes the function once per mounting of the associated component.
 *  - ONCE.ON_UNMOUNT: Same as above except it's once per unmounting.
 *
 * Using the second and third strategies, multiple mounting and unmounting of the node will cause the function
 * to be invoked multiple times, but not on a simple refresh of the component's contents.
 */
export function once(fn, strategy = ONCE.ONLY) {

    const caches = new Map();
    caches.set(fn, new Set());
    const cache = caches.get(fn);

    /**
     * @method maybeInvoke
     * @param {Function} fn
     * @param {Object} props
     * @return {Object}
     */
    function maybeInvoke(fn, props) {

        return cache.has(props.node) ? props : do {
            cache.add(props.node);
            fn(props);
        };

    }

    return async props => {

        if (props.node.isConnected) {
            const result = strategy !== ONCE.ON_UNMOUNT && await maybeInvoke(fn, props);
            strategy === ONCE.ON_UNMOUNT && cache.delete(props.node);
            return { ...result, ...props };
        }

        const result = await maybeInvoke(fn, props);
        strategy === ONCE.ON_MOUNT && cache.delete(props.node);
        return { ...result, ...props };

    };

}

/**
 * @method rescue :: Tree t, Props p => t -> (p -> p)
 * @param {Function} getTree
 * @return {Function}
 *
 * Takes a list of middleware which includes one or more 'html' middleware items, and renders into the component
 * whenever an exception is raised in the processing of the middleware. If the 'rescue' middleware has not been
 * defined on the component, then a console error will be rendered instead, but only in development mode.
 *
 * You can only define one error component per node.
 */
export function rescue(getTree) {

    return props => {
        errorHandlers.set(props.node, getTree);
        return props;
    };

}

/**
 * @method state :: Props p => Object String * -> (p -> p)
 * @param {Object} [initial = {}]
 * @return {Function}
 *
 * Takes an object that represents the initial state and augments the props. When your component invokes the
 * render function from the props, the passed object will merged with the previous render's props.
 */
export function state(initial = {}) {

    return props => {
        const state = props.prevProps && { ...props.prevProps.state, ...props.state };
        return { ...props, state: state || initial, setState: state => props.render({ state }) };
    };

}

/**
 * @method validate :: Props p => Object String * -> (p -> p)
 * @param {Object} schema
 * @return {Function}
 * @see https://github.com/facebook/prop-types
 *
 * Takes a schema and validates the incoming props at the given point in the middleware chain. This is in addition
 * to static-type checking, as it validates props at runtime, which is useful for incoming data from APIs, etc...
 *
 * When building the project using NODE_ENV as 'production', the `validate` middleware won't validate, and will
 * remove most of its code to save crucial bytes.
 */
export function validate(schema) {

    return process.env.NODE_ENV === 'production' ? props => props : async props => {
        const PropTypes = require('prop-types');
        PropTypes.checkPropTypes(schema, props, 'property', props.node.nodeName);
        return props;
    };

}

/**
 * @method wait :: Props p => [String] -> (p -> p)
 * @param {Array<String>} names
 * @return {Function}
 *
 * Takes a list of node names that correspond to Switzerland defined custom elements. Awaits for them to
 * be mounted in the DOM, including running all of their associated middleware, before resolving the custom element
 * that the 'wait' middleware was defined on.
 *
 * This allows for components to be atomic, in that a parent component cannot be considered resolved until its
 * child components have been resolved. It could potentially be a long chain of component dependencies.
 *
 * It's worth noting that the 'wait' middleware will not await a node that is not in the DOM, therefore it's acceptable
 * to list nodes that may or may not be in the DOM, depending on conditionals.
 */
export function wait(...names) {

    return async props => {

        // Determine which elements we need to await being resolved before we continue.
        const resolved = new Set();

        await new Promise(resolve => {

            // Find all of the nodes to wait upon, minus those that have already been resolved.
            const nodes = Array.from(names.map(translate).reduce((accum, name) => {
                return [...accum, ...Array.from(props.boundary.querySelectorAll(name))];
            }, [])).filter(node => !node.classList.contains('resolved'));

            nodes.length === 0 ? resolve() : window.addEventListener(eventName, function listener(event) {
                nodes.includes(event.detail.node) && resolved.add(event.detail.node);
                resolved.size === nodes.length && do {
                    window.removeEventListener(eventName, listener);
                    resolve();
                    resolved.clear();
                };
            });

        });

        return props;

    };

}
