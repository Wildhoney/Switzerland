import morph from 'morphdom';
// import { h, patch } from 'superfine';
import * as utils from './utils.js';

export default function html(getTree) {
    return async (props) => {
        const tree = await getTree({ ...props, h: utils.createVNode });
        const dom = await utils.getVNodeDOM(tree);
        const fragment = document.createDocumentFragment();
        props.boundary && fragment.append(dom);

        morph(props.boundary, fragment, {
            onBeforeElUpdated(from, to) {
                const isSwiss = from instanceof HTMLElement && 'swiss' in from.dataset;
                return isSwiss ? false : to;
            },
        });

        utils.attachEventListeners(tree, props.boundary.firstChild);

        return { ...props, tree };
    };
}
