import { patch } from 'picodom';
import parseUrls from 'css-url-parser';
import escapeRegExp from 'escape-string-regexp';
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
 * @constant path
 * @type {String}
 */
const path = do {
    const has = typeof document !== 'undefined' && document.currentScript;
    const parts = ((has && document.currentScript.getAttribute('src')) || '').split('/');
    parts.length === 1 ? '' : parts.slice(0, -1).join('/');
};

/**
 * @method attrs
 * @param {Array} exclude
 * @return {Function}
 */
export function attrs(exclude = ['id', 'class']) {

    const observers = new Map();

    return props => {

        if (!observers.has(props.node)) {

            const observer = new MutationObserver(mutations => {
                const rerender = !mutations.every(m => exclude.includes(m.attributeName));
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
                    const css = urls.length ? urls.map(url => result.replace(url, `${path}/${url}`)).join() : result;

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
