import { Swiss, InitialProperties } from './create';
import { getWindow } from '../middleware/html/utils';

export default async function render(app: Swiss, props: InitialProperties = {}): Promise<string> {
    const node = getWindow().document.createElement(app.name);
    const tree = await app.render({ ...props, node });
    return tree.node.outerHTML;
}
