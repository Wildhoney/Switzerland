import { VNode, h } from 'preact';
import renderToString from 'preact-render-to-string';
import {
    hydrate,
    useState,
    useEffect,
    useCallback,
    useReducer,
    useContext,
    useMemo,
    createContext,
    Fragment,
} from 'preact/compat';
import { EffectCallback } from 'preact/hooks';
import { RenderOptions, ToTransform, Tree } from './types';
import { dispatchEvent, getAttributes, hasApplicableMutations } from './utils';
import { String, Int, BigInt, Float, Bool, Array, Tuple, Regex, ToType } from './types';

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

export { h, Fragment } from 'preact';

const Env = createContext<RenderOptions>({
    path: null,
    root: null,
    node: null,
});

const Attrs = createContext<Record<string, string>>({});

export function render(vnode: VNode, options: Omit<RenderOptions, 'node'>) {
    return renderToString(h(Fragment, {}, h(Env.Provider, { value: { ...options, node: null }, children: vnode })));
}

export function create<Attrs>(name: string, tree: Tree<ToType<Attrs>>) {
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
                    const shadowRoot = this.shadowRoot ?? this.attachShadow({ mode: 'open' });

                    hydrate(
                        h(Env.Provider, {
                            value: { path: window.location.href, root: null, node: this },
                            children: h(Attrs.Provider, { value: attrs, children: h(tree, attrs) }),
                        }),
                        shadowRoot as unknown as Element
                    );
                }
            }
        );

        return function Tree(attrs: ToType<Attrs>): VNode {
            return h(name, attrs);
        };
    }

    return function Tree(attrs: ToType<Attrs>): VNode {
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
    path(componentUrl: string) {
        const env = useContext(Env);

        return (resourcePath: string) => {
            if (typeof window !== 'undefined') return new URL(resourcePath, componentUrl).href;

            const url = componentUrl.replace('file://', '') ?? '';
            return `${env.path.replace(/(\/)*$/g, '')}/${url
                .replace(env.root, '')
                .replace(/^(\/)*/g, '')
                .replace(/\/[^\/]*$/i, '')}/${resourcePath}`;
        };
    },
    attrs<Attrs>(map: ToTransform<Partial<Attrs>>): Record<string, any> {
        const attrs = useContext(Attrs);
        return Object.entries(attrs).reduce(
            (attrs, [key, value]) => ({ ...attrs, [key]: (map[key] ?? String)(value) }),
            {}
        );
    },
    dispatch() {
        const env = useContext(Env);
        return useMemo(() => dispatchEvent(env.node), [env.node]);
    },
};
