import { Child } from '../../types';
import { getWindow, isNode, isSwiss } from '../../utils';

export async function transform(parentNode: HTMLElement, child: Child): Promise<string> {
    const window = await getWindow();

    if (typeof child === 'string') {
        const node = window.document.createTextNode(child);
        parentNode.appendChild(node);
        return parentNode.outerHTML;
    }

    if (isNode(child) || isSwiss(child)) {
        const node = !isSwiss(child.element)
            ? window.document.createElement(child.element)
            : await child.element.render(child.attributes);

        parentNode.appendChild(node);

        if (child.children != null)
            await Promise.all(child.children.map(async (child) => await transform(node, child)));

        return node.outerHTML;
    }

    return '';
}
