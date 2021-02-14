import { DOMWindow } from 'jsdom';
import * as impl from '../impl';
import { getWindow } from '../../utils';
import type { Attributes, View } from '../../types';

export function create(constructor: CustomElementConstructor, view: View): CustomElementConstructor {
    class Swiss extends constructor implements impl.Swiss {
        #meta: symbol = Symbol('meta');

        async render(attributes: Attributes = {}): Promise<HTMLElement> {
            const window = (await getWindow()) as DOMWindow;
            const node = window.document.createElement('div');
            node.setAttribute('data-swiss', '');

            return node;
        }
    }

    return (Swiss as unknown) as CustomElementConstructor;
}
