import morph from 'morphdom';
import * as utils from './utils.js';

export default function html(getTree) {
    return async (props) => {
        const tree = await getTree({
            ...props,
            h: utils.createVNode,
            style: utils.createStyleVNode(props.node),
        });
        const dom = await utils.getVNodeDOM(tree);
        const fragment = document.createDocumentFragment();
        props.boundary && fragment.append(dom);

        morph(props.boundary, fragment, {
            onBeforeElUpdated(from, to) {
                const isSwiss = from instanceof HTMLElement && 'swiss' in from.dataset;
                return isSwiss ? false : to;
            },
        });

        // Wait until the appended style sheets have been resolved.
        await Promise.allSettled([...(utils.styleSheets.get(props.node) ?? [])]);

        // Attach the required event listeners to the DOM.
        utils.attachEventListeners(tree, props.boundary.firstChild);

        return { ...props, tree };
    };
}
