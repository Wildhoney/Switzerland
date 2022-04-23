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
import { String, Int, BigInt, Float, Bool, Array, Tuple, Regex } from './types';

export const types = {
    String,
    Int,
    BigInt,
    Float,
    Bool,
    Array,
    Tuple,
    Regex,
};

export { h } from 'preact';

const Env = createContext<RenderOptions>({
    path: typeof window === 'undefined' ? null : window.location.href,
    root: null,
});

const Attrs = createContext<Record<string, string>>({});

export function render(vnode: VNode, options: RenderOptions) {
    return renderToString(h(Fragment, {}, h(Env.Provider, { value: options, children: vnode })));
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
                    hydrate(
                        h(Attrs.Provider, { value: attrs, children: h(tree, attrs) }),
                        this.shadowRoot as unknown as Element
                    );
                }
            }
        );

        return function Tree(attrs: Attrs): VNode {
            return h(name, attrs);
        };
    }

    return function Tree(attrs: Attrs): VNode {
        return h(
            name,
            attrs,
            h('template', { shadowroot: 'open' }, h(Attrs.Provider, { value: attrs, children: h(tree, attrs) }))
        );
    };
}

export const use = {
    state: useState,
    effect: useEffect,
    callback: useCallback,
    reducer: useReducer,
    mount(fn: EffectCallback) {
        useEffect(fn, []);
    },
    unmount(fn: EffectCallback) {
        useEffect(() => fn, []);
    },
    env() {
        return useContext(Env);
    },
    path(path: string): string {
        return path;
    },
    attrs(map: Record<string, any>): Record<string, any> {
        const attrs = useContext(Attrs);
        return Object.entries(attrs).reduce((attrs, [key, value]) => ({ ...attrs, [key]: map[key](value) }), {});
    },
};
