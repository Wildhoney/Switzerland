import * as server from './server';
import { Attributes, Node, Children, View, Element } from '../types';

export function create(name: string, view: View = () => null): server.Swiss {
    const extend = null;

    return new server.Swiss(name, extend, view);
}

export async function render(component: server.Swiss): Promise<string> {
    const node = await component.render();

    return node.outerHTML;
}

export function h(element: Element, attributes: Attributes = {}, children: Children = []): Node {
    return { element, attributes, children };
}
