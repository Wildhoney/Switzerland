import morph from 'morphdom';
import * as utils from './utils.js';
import { dispatchEvent } from '../../core/impl/utils.js';

export default (getTree) => {
    return async function html(props) {
        const tree = await getTree(props);

        if (props.server) {
            const nodes = await utils.getVNodeDOM(
                typeof props.boundary === 'function' ? props.boundary(tree) : tree
            );
            const fragment = await utils.getVNodeFragment(nodes);
            props.node.appendChild(fragment);
            return { ...props, boundary: props.node.shadowRoot };
        }

        const nodes = await utils.getVNodeDOM(tree);
        const fragment = await utils.getVNodeFragment(nodes);

        morph(props.boundary, fragment, {
            childrenOnly: props.boundary != null,

            getNodeKey(node) {
                if (!(node instanceof HTMLElement)) return null;
                return node.getAttribute('key') ?? null;
            },
            onNodeAdded(node) {
                node.attachEventListeners(node);
                dispatchEvent(node)('create', { node });
            },
            onNodeDiscarded(node) {
                node.detatchEventListeners(node);
                dispatchEvent(node)('destroy', { node });
            },
            onBeforeElUpdated(from, to) {
                const isSwiss = from instanceof HTMLElement && 'swiss' in from.dataset;
                to.attachEventListeners(from);
                return isSwiss ? false : to;
            },
        });

        return { ...props, html: getTree };
    };
};
