import * as server from './server';
import { Attributes, Node, Children, View, Element } from '../types';

export function create(name: string, view: View = () => null): server.SwissServer {
    const extend = null;

    return server.create(name, extend, view);
}

export async function render(component: server.SwissServer): Promise<string> {
    const node = await component.render();

    return node.outerHTML;
}

export function h(element: Element, attributes: Attributes = {}, children: Children = []): Node {
    return { element, attributes, children };
}
