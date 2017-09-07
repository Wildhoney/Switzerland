import { patch } from 'picodom';
import parseUrls from 'css-url-parser';
import { listeners } from './switzerland';
import { takeVDomTree, putState } from './helpers/registry';

/**
 * @constant errorHandlers
 * @type {WeakMap}
 */
export const errorHandlers = new WeakMap();

/**
 * @constant ONCE
 * @type {Object}
 */
export const ONCE = {
    ONLY: Symbol('only'),
    ON_MOUNT: Symbol('mount'),
    ON_UNMOUNT: Symbol('unmount')
};

/**
 * @method kebabToCamel
 * @param {String} value
 * @return {String}
 */
function kebabToCamel(value) {
    return value.replace(/(-\w)/g, match => match[1].toUpperCase());
}

/**
 * @method escapeRegExp
 * @param {String} str
 * @return {String}
 */
function escapeRegExp(value) {
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * @constant path
 * @type {String}
 */
const path = do {
    const parts = ((document.currentScript && document.currentScript.getAttribute('src')) || '').split('/');
    parts.length === 1 ? '' : parts.slice(0, -1).join('/');
};

/**
 * @method attrs
 * @param {Array} [exclude = []]
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
export function attrs(exclude = ['class', 'id']) {

    const observers = new Map();

    return props => {

        if (!observers.has(props.node)) {

            const observer = new MutationObserver(mutations => {
                const rerender = !mutations.every(mutation => exclude.includes(mutation.attributeName));
                rerender && props.render();
            });

            observer.observe(props.node, { attributes: true });
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
 * @method html
 * @param {Function} getTree
 * @return {Function}
 * @see https://github.com/picodom/picodom
 *
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export function html(getTree) {

    return async props => {

        if (props.node.isConnected) {

            // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
            const previous = takeVDomTree(props.node) || {};
            const tree = await getTree({ ...props, render: props.render });
            const root = patch(previous.tree, tree, previous.root, props.node.shadowRoot);

            // Save the virtual DOM state for cases where an error short-circuits the chain.
            putState(props.node, tree, root, props);

        }

        return props;

    };

}

/**
 * @method include
 * @param {Array} files
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

    const cache = new Map();
    const cacheKey = files.join('');

    return async props => {

        if (!props.node.shadowRoot.querySelector('style')) {

            const content = cache.has(cacheKey) ? cache.get(cacheKey) : do {

                const content = files.reduce(async (accumP, _, index) => {

                    const result = await fetch(`${path}/${files[index]}`).then(r => r.text());
                    const urls = parseUrls(result);
                    const css = urls.length ? urls.map(url => {
                        const replacer = new RegExp(escapeRegExp(url), 'ig');
                        return result.replace(replacer, `${path}/${url}`);
                    }).join() : result;

                    return `${css} ${await accumP}`;

                }, '');

                cache.set(cacheKey, content);
                content;

            };

            const style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.innerHTML = await content;
            props.node.shadowRoot.appendChild(style);

        }

        return props;

    };

}

/**
 * @method methods
 * @param {Object} fns
 * @return {Function}
 *
 * Takes a map of function names to functions, and attaches them to the node, which allows you to directly
 * invokes the functions once you have a reference to the node. Using the 'methods' middleware passes the arguments
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
 * @method once
 * @param {Function} fn
 * @param {Symbol} [strategy = ONCE.ONLY]
 * @return {Function}
 *
 * Takes a function and an optional strategy that allows for the passed function to be invoked only once, which
 * is useful for one-off functionality, such as being used as a constructor or initialiser, or cleaning up when the
 * node is removed from DOM.
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

    const cache = new Set();

    /**
     * @method maybeInvoke
     * @param {Function} fn
     * @param {Object} props
     * @return {Object}
     */
    function maybeInvoke(fn, props) {

        return cache.has(fn) ? props : do {
            cache.add(fn);
            fn(props);
        };

    }

    return async props => {

        if (props.node.isConnected) {
            const result = strategy !== ONCE.ON_UNMOUNT && maybeInvoke(fn, props);
            strategy === ONCE.ON_UNMOUNT && cache.delete(fn);
            return { ...result, ...props };
        }

        const result = maybeInvoke(fn, props);
        strategy === ONCE.ON_MOUNT && cache.delete(fn);
        return { ...result, ...props };

    };

}

/**
 * @method rescue
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
        !errorHandlers.has(props.node) && errorHandlers.set(props.node, getTree);
        return props;
    };

}

/**
 * @method wait
 * @param {Array} names
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

            const nodes = names.reduce((accum, name) => {
                return [...accum, ...Array.from(props.node.shadowRoot.querySelectorAll(name))];
            }, []);

            nodes.length === 0 ? resolve() : do {

                /**
                 * @method listener
                 * @param {HTMLElement} node
                 * @return {void}
                 */
                listeners.add(function listener(node) {
                    resolved.add(node);
                    resolved.size === nodes.length && do {
                        listeners.delete(listener);
                        resolve();
                        resolved.clear();
                    };
                });

            };

        });

        return props;

    };

}
