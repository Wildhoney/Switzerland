import * as server from './server';
import * as client from './client';
import { Attributes, Node, Children, View, Element, Options } from '../types';
import { parseName, getRandomName } from './utils';
import { getWindow } from '../utils';

export function create(name: string, view: View = () => null): void | server.Swiss | CustomElementConstructor {
    const [tag, constructor, extend] = parseName(name);

    try {
        const component = client.create(constructor as CustomElementConstructor, view);

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

export async function render(app: server.Swiss, attributes: Attributes = {}, options: Options = {}): Promise<string> {
    const node = await app.render(attributes);

    return node.outerHTML;
}

export function h(element: Element, attributes: Attributes = {}, children: Children = []): Node {
    return { element, attributes, children };
}

export async function preload(...trees: string[]): Promise<string> {
    const window = await getWindow();

    const links = trees
        .flatMap((tree) => tree.match(/<link.+?>/gis))
        .map((link) => {
            if (!link) return '';

            // Parse the link DOM string into a HTML node.
            const node = window.document.createElement('div');
            node.innerHTML = link;
            const child = node.firstChild as HTMLElement;

            // Transform the link into a preload node for the head of the document.
            child?.setAttribute('as', 'style');
            child?.setAttribute('rel', 'preload');
            child?.removeAttribute('key');
            child?.removeAttribute('type');

            return child?.outerHTML ?? '';
        });

    return links.join('\n');
}
