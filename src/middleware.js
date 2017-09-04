import { patch } from 'picodom';
import { state } from './switzerland';
import { kebabToCamel } from './helpers';

/**
 * @type Props
 */
export type Props = { node: HTMLElement, render: Function };

/**
 * @type TreeRoot
 */
export type TreeRoot = { tree: {}, root: HTMLElement, props: {} };

/**
 * @constant errorHandlers
 * @type {WeakMap}
 */
export const errorHandlers: WeakMap<HTMLElement, Function> = new WeakMap();

/**
 * @constant nullObject
 * @type {Object}
 */
const nullObject = Object.create(null);

/**
 * @constant path
 * @type {String}
 */
const path: string = (() => {
    const script: window.HTMLScriptElement | null = window.document.currentScript;
    return script ? script.getAttribute('src') || '' : '';
})();

/**
 * @method include
 * @param {Array} files
 * @return {Function}
 */
export function include(...files: Array<string>): Function {

    return async props => {

        if (!props.node.shadowRoot.querySelector('style')) {

            const content = await files.reduce(async (accumP, _, index) => {
                const result = await window.fetch(files[index]).then(r => r.text());
                return `${result} ${await accumP}`;
            }, '');

            const style = window.document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.innerHTML = content;
            props.node.shadowRoot.appendChild(style);

        }

        return props;

    };

}

/**
 * @method recover
 * @param {Function} getTree
 * @return {Function}
 */
export function recover(getTree: Props => Props): Function {

    return (props: Props): Props => {
        !errorHandlers.has(props.node) && errorHandlers.set(props.node, getTree);
        return props;
    };

}

/**
 * @method attrs
 * @return {Function}
 */
export function attrs(): Function {

    let observer: MutationObserver | void;

    return props => {

        !observer && (() => {
            observer = new window.MutationObserver(props.render);
            observer.observe(props.node, { attributes: true });
        })();
        
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
export function html(getTree: Props => Props): Function {

    return async props => {

        if (window.document.contains(props.node)) {

            const previous: TreeRoot = props.node[state].takeVDomTree() || {};
            const tree: {} = await getTree({ ...props, render: props.render });

            // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
            const root: HTMLElement = patch(previous.tree, tree, previous.root, props.node.shadowRoot);

            // Save the virtual DOM state for cases where an error short-circuits the chain.
            props.node[state].putState(tree, root, props);

        }

        return props;

    };

}
