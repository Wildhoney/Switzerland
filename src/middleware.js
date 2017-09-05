import { patch } from 'picodom';
import { state } from './switzerland';
import { kebabToCamel } from './helpers';

/**
 * @constant errorHandlers
 * @type {WeakMap}
 */
export const errorHandlers = new WeakMap();

/**
 * @constant nullObject
 * @type {Object}
 */
const nullObject = Object.create(null);

/**
 * @constant path
 * @type {String}
 */
const path = do {
    const script = document.currentScript;
    script ? script.getAttribute('src') || '' : '';
};

/**
 * @method include
 * @param {Array} files
 * @return {Function}
 */
export function include(...files) {

    const cache = new Map();
    const cacheKey = files.join(';');

    return async props => {

        if (!props.node.shadowRoot.querySelector('style')) {

            const content = cache.has(cacheKey) ? cache.get(cacheKey) : do {

                const content = files.reduce(async (accumP, _, index) => {
                    const result = await fetch(files[index]).then(r => r.text());
                    return `${result} ${await accumP}`;
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
 * @method attrs
 * @param {Array} exclude
 * @return {Function}
 */
export function attrs(exclude = ['class', 'id']) {

    const observers = new Map();

    return props => {

        !observers.has(props.node) && do {

            const observer = new MutationObserver(mutations => {
                const rerender = !mutations.every(m => exclude.includes(m.attributeName));
                rerender && props.render();
            });

            observer.observe(props.node, { attributes: true });
            observers.set(props.node, observer);

        };

        const attrs = Object.keys(props.node.attributes).reduce((acc, index) => {
            const attr = props.node.attributes[index];
            return { ...acc, [kebabToCamel(attr.nodeName)]: attr.nodeValue };
        }, nullObject);

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

            const previous = props.node[state].takeVDomTree(props.node) || {};
            const tree = await getTree({ ...props, render: props.render });

            // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
            const root = patch(previous.tree, tree, previous.root, props.node.shadowRoot);

            // Save the virtual DOM state for cases where an error short-circuits the chain.
            props.node[state].putState(props.node, tree, root, props);

        }

        return props;

    };

}
