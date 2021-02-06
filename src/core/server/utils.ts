import { Child, Node, Element } from '../../types';
import { getWindow } from '../../utils';
import * as server from '../server';

export async function transform(parentNode: HTMLElement, child: Child): Promise<string> {
    const window = await getWindow();

    if (typeof child === 'string') {
        const node = window.document.createTextNode(child);
        parentNode.appendChild(node);
        return parentNode.outerHTML;
    }

    if (isNode(child)) {
        if (isHTMLElement(child.element)) {
            const node = window.document.createElement(child.element);
            parentNode.appendChild(node);

            if (child.children != null)
                await Promise.all(child.children.map(async (child) => await transform(node, child)));

            return node.outerHTML;
        }

        if (isSwiss(child.element)) {
            const node = await child.element.render(child.attributes);
            parentNode.appendChild(node);

            if (child.children != null)
                await Promise.all(child.children.map(async (child) => await transform(node, child)));

            return node.outerHTML;
        }
    }

    return '';
}

function isNode(child: Child): child is Node {
    return 'element' in Object(child);
}

function isHTMLElement(element: Element): element is string {
    return typeof element === 'string';
}

function isSwiss(element: Element): element is server.Swiss {
    return element instanceof server.Swiss;
}
