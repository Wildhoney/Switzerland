import { DOMWindow } from 'jsdom';
import * as abstract from '../abstract';
import { getWindow } from '../../utils';
import type { Attributes } from './types';

export class Swiss extends abstract.Swiss {
    protected name: string;
    protected extend: null | string;

    constructor(name: string, extend?: string) {
        super();
        this.name = name;
        this.extend = extend ?? null;
    }

    async render(attributes: Attributes = {}): Promise<HTMLElement> {
        // Initialte the node and defined the `data-swiss` attribute which denotes a boundary.
        const window = (await getWindow()) as DOMWindow;
        const node = window.document.createElement(this.name);
        node.setAttribute('data-swiss', '');

        // Define the optional element to be extended from which will inherit its behaviours.
        if (this.extend != null) node.setAttribute('is', this.extend);

        // Define all of the attributes for the host node.
        for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);

        return node;
    }
}

export function create(name: string, extend?: string): InstanceType<typeof Swiss> {
    return new Swiss(name, extend);
}
