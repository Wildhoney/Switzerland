import { Child, EventDispatch } from '../../types';
import { getWindow, isNode, isSwiss } from '../../utils';
import { Props, EventName, EventPayload, EventOptions } from '../../types';

export async function getInitialProps({ node, server }: Pick<Props, 'node' | 'server'>): Promise<Props> {
    return {
        node,
        lifecycle: 'mount',
        server,
        render: () => null,
        window: await getWindow(),
        dispatch: dispatch(node),
    };
}

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

export function dispatch(node: HTMLElement): EventDispatch {
    return (name: EventName, payload: EventPayload, options: EventOptions = {}) => {
        const model = typeof payload === 'object' ? payload : { value: payload };

        return node.dispatchEvent(
            new window.CustomEvent(name, {
                bubbles: true,
                composed: true,
                ...options,
                detail: { ...model, version: 5 },
            })
        );
    };
}
