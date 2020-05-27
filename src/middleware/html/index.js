import morph from 'morphdom';
import * as utils from './utils.js';

export default function html(getTree) {
    return async (props) => {
        const tree = await getTree({
            ...props,
            h: utils.createVNode(props.node),
        });
        const dom = await utils.getVNodeDOM(tree);
        const fragment = document.createDocumentFragment();
        props.boundary && fragment.append(dom);

        morph(props.boundary, fragment, {
            getNodeKey(node) {
                if (!(node instanceof HTMLElement)) return null;
                return node.getAttribute('key') ?? null;
            },
            onNodeAdded(node) {
                const event = new CustomEvent('create');
                setTimeout(() => node.dispatchEvent(event));
            },
            onNodeDiscarded(node) {
                const event = new CustomEvent('destroy');
                setTimeout(() => node.dispatchEvent(event));
            },
            onBeforeElUpdated(from, to) {
                const isSwiss = from instanceof HTMLElement && 'swiss' in from.dataset;
                return isSwiss ? false : to;
            },
        });

        // Attach the required event listeners to the DOM.
        utils.attachEventListeners(tree, props.boundary.firstChild);

        // Wait until the appended style sheets have been resolved.
        const styleSheets = utils.styleSheets.get(props.node);
        styleSheets && (await Promise.allSettled(styleSheets));

        return { ...props, tree };
    };
}
