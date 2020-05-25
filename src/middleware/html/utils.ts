import { Tree, Properties, Tag, ChildNode } from '../../core/h';
import { Swiss, SwissComponent } from '../../core/create';

let mockWindow = <Window | null>null;

declare global {
    interface Window {
        HTMLElement: typeof HTMLElement;
        BigInt: typeof BigInt;
        Date: typeof Date;
    }
}

function isSwiss(tag: Tag): tag is Swiss {
    return tag instanceof SwissComponent;
}

function isChildNode(tag: Tag): tag is ChildNode {
    return typeof tag === 'function';
}

async function getNode(tag: Tag, attrs: Properties): Promise<HTMLElement | Text> {
    const window = getWindow();

    if (typeof tag === 'string') {
        const node = window.document.createTextNode(tag);
        return node;
    }

    if (isSwiss(tag)) {
        const node = window.document.createElement(tag.name);
        await tag.render({ node, attrs });
        return node;
    }

    if (isChildNode(tag)) return tag(attrs);

    return window.document.createElement(tag.name);
}

export function getWindow(): Window {
    if (typeof window !== 'undefined') return window;
    if (mockWindow != null) return mockWindow;
    const { JSDOM } = require('jsdom');
    mockWindow = new JSDOM().window;
    return mockWindow;
}

export async function parseTree(tree: Tree): Promise<HTMLElement | Text> {
    const window = getWindow();
    const [tag, attrs = {}, children = []] = [].concat(tree);
    const node = await getNode(tag, attrs);

    // Apply all of the supplied attributes onto the node.
    node instanceof window.HTMLElement &&
        Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));

    await Promise.all(
        children.map(async (tree) => {
            const childNode = await parseTree(tree);
            node.appendChild(childNode);
        })
    );

    return node;
}
