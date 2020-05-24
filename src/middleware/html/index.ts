import { Middleware, Properties } from '../../core/create';
import { Tree } from '../../core/h';
import * as utils from './utils';

export default function html(getTree: (props: Properties) => Tree | Promise<Tree>): Middleware {
    return async (props) => {
        const tree = await getTree(props);
        const node = await utils.parseTree(tree);

        if (props.server) {
            props.node.appendChild(node);
            return props;
        }

        return props;
    };
}
