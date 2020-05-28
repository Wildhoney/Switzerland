import { createVNode } from '../html/utils.js';
import * as utils from './utils.js';

/**
 * @function boundary
 * ---
 * Creates a shadow boundary with the supplied options, such as whether the boundary is
 * open, delegates focus, and also the chance to include adopted stylesheets.
 */
export default (options) => {
    return function boundary(props) {
        if (props.server)
            return {
                ...props,
                boundary: (tree) => {
                    const h = createVNode(props.node);
                    return h('x-template', { shadowroot: 'open' }, tree);
                },
            };

        const boundary = utils.attachBoundary(props.node, options);
        return { ...props, boundary };
    };
};
