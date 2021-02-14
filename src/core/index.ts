import * as server from './server';
import * as client from './client';
import { Attributes, Node, Children, View, Element } from '../types';
import { parseName, getRandomName } from './utils';

export function create(name: string, view: View = () => null): void | server.Swiss | CustomElementConstructor {
    const [tag, constructor, extend] = parseName(name);

    try {
        const component = client.create(constructor, view);

        window.customElements.define(
            window.customElements.get(tag) ? getRandomName() : tag,
            component,
            extend ? { extends: extend } : undefined
        );

        return component;
    } catch {
        return server.create(tag, extend, view);
    }
}

export async function render(component: server.Swiss): Promise<string> {
    const node = await component.render();

    return node.outerHTML;
}

export function h(element: Element, attributes: Attributes = {}, children: Children = []): Node {
    return { element, attributes, children };
}
