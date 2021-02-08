import { DOMWindow } from 'jsdom';
import { SwissBase } from '../base';
import { SwissInterface } from '../interface';
import { getWindow } from '../../utils';
import type { Attributes, View } from '../../types';
import { getInitialProps, transform } from './utils';

export class SwissServer extends SwissBase implements SwissInterface {
    #name: string;
    #extend: null | string;
    #view: View;

    constructor(name: string, extend: null | string = null, view: View) {
        super();

        this.#name = name;
        this.#extend = extend;
        this.#view = view;
    }

    async render(attributes: Attributes = {}): Promise<HTMLElement> {
        // Initialte the node and defined the `data-swiss` attribute which denotes a boundary.
        const window = (await getWindow()) as DOMWindow;
        const node = window.document.createElement(this.#name);
        node.setAttribute('data-swiss', '');

        // Define the optional element to be extended from which will inherit its behaviours.
        if (this.#extend != null) node.setAttribute('is', this.#extend);

        // Define all of the attributes for the host node.
        for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);

        // Render the current view and all of its descendant views.
        await transform(node, this.#view(getInitialProps({ node })));

        return node;
    }
}

export function create(
    name: string,
    extend: null | string = null,
    view: View = () => null
): InstanceType<typeof SwissServer> {
    return new SwissServer(name, extend, view);
}
