import { DOMWindow } from 'jsdom';
import { Child, Element, Node } from './types';
import * as server from './core/server';

export async function getWindow(): Promise<Window | DOMWindow> {
    if (typeof window !== 'undefined') return window as Window;

    {
        const dom = await import('jsdom');
        const { window } = new dom.default.JSDOM();
        return window as DOMWindow;
    }
}

export function isNode(child: Child): child is Node {
    return 'element' in Object(child);
}

export function isSwiss(element: null | Element): element is server.Swiss {
    return element instanceof server.Swiss;
}
