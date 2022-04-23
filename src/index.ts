import { VNode, h } from 'preact';
import renderToString from 'preact-render-to-string';
import {
    hydrate,
    useState,
    useEffect,
    useCallback,
    useReducer,
    useContext,
    createContext,
    Fragment,
} from 'preact/compat';
import { EffectCallback } from 'preact/hooks';
import { RenderOptions, Tree } from './types';
import { getAttributes, hasApplicableMutations } from './utils';

export { h } from 'preact';

const Node = createContext<RenderOptions>({ path: null, root: null });

export function render(vnode: VNode, options: RenderOptions) {
    return renderToString(h(Fragment, {}, h(Node.Provider, { value: options, children: vnode })));
}

export function create<Attrs extends Record<string, string>>(name: string, tree: Tree<Attrs>) {
    if (typeof window !== 'undefined') {
        window.customElements.define(
            name,
            class Swiss extends HTMLElement {
                private observer: MutationObserver;

                connectedCallback() {
                    this.observer = new window.MutationObserver(
                        (mutations) => hasApplicableMutations(this, mutations) && this.render()
                    );

                    this.observer.observe(this, {
                        attributes: true,
                        attributeOldValue: true,
                    });

                    this.render();
                }

                disconnectedCallback() {
                    this.observer.disconnect();
                }

                render() {
                    const attrs = getAttributes(this.attributes);
                    hydrate(h(tree, attrs), this.shadowRoot as unknown as Element);
                }
            }
        );

        return function Tree(attrs: Attrs): VNode {
            return h(name, attrs);
        };
    }

    return function Tree(attrs: Attrs): VNode {
        return h(name, attrs, h('template', { shadowroot: 'open' }, h(tree, attrs)));
    };
}

export const use = {
    state: useState,
    effect: useEffect,
    callback: useCallback,
    reducer: useReducer,
    mount: (fn: EffectCallback) => {
        useEffect(fn, []);
    },
    unmount: (fn: EffectCallback) => {
        useEffect(() => fn, []);
    },
    node: () => useContext(Node),
    path: (path: string): string => path,
};
