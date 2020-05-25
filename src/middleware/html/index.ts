import { Middleware, Properties } from '../../core/create';
import { Tree } from '../../core/h';
import * as utils from './utils';

export default function html(getTree: (props: Properties) => Tree | Promise<Tree>): Middleware {
    return async (props) => {
        const tree = await getTree(props);
        const children = await utils.parseTree(tree);

        if (props.server) {
            props.node.appendChild(children);
            return props;
        }

        const morph = await import(
            'https://cdn.jsdelivr.net/npm/morphdom@2.6.1/dist/morphdom-esm.js'
        );

        const node = <HTMLElement>props.node.cloneNode(false);
        const root = props.node.shadowRoot ?? props.node.attachShadow({ mode: 'open' });

        node.appendChild(children);
        morph.default(root, node.outerHTML);

        return props;
    };
}
