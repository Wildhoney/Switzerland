import { VNode, h } from 'preact';
import renderToString from 'preact-render-to-string';
import Preact, {
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
import { RenderOptions, Tree, VariablesProps } from './types';
import { dispatchEvent, fromCamelcase, getAttributes, hasApplicableMutations } from './utils';
import { String, Int, BigInt, Float, Bool, Array, Tuple, Regex, StyleSheetProps } from './types';
import { bindActionCreators } from 'redux';

export const type = {
    String,
    Int,
    BigInt,
    Float,
    Bool,
    Array,
    Tuple,
    Regex,
};

export { h, VNode } from 'preact';

const Env = createContext<RenderOptions>({
    path: null,
    root: null,
    node: null,
});

const Attrs = createContext<Record<string, string>>({});

export function render(vnode: VNode, options: Omit<RenderOptions, 'node'>) {
    return renderToString(h(Fragment, {}, h(Env.Provider, { value: { ...options, node: null }, children: vnode })));
}

export function create<Attrs extends {}>(name: string, tree: Tree<Attrs>) {
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

                    Preact.render(
                        h(Env.Provider, {
                            value: { path: window.location.href, root: null, node: this },
                            children: h(Attrs.Provider, { value: attrs, children: h(tree, attrs) }),
                        }),
                        shadowRoot as unknown as Element
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

export function preload(html): string {
    const links = html.match(/(<link.*type="text\/css".+?\/>)/gi);
    const urls = links[0].match(/href="(.+?)"/gi);

    return urls.map((url) => `<link as="style" rel="preload" ${url} />`).join('\n');
}

export const use = {
    memo: useMemo,
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
    attrs<Attrs>(map: Partial<Attrs>): Record<string, any> {
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
    store(store, actionCreators) {
        const { dispatch, subscribe, getState } = useMemo(() => store, [store]);
        const [state, setState] = useState(getState());
        const actions = useMemo(() => bindActionCreators(actionCreators, dispatch), [actionCreators, dispatch]);

        subscribe(() => setState(getState()));

        return [state, dispatch, actions];
    },
};

export const node = {
    Fragment,
    StyleSheet({ href, media }: StyleSheetProps): VNode {
        return h('link', { rel: 'stylesheet', type: 'text/css', media, href });
    },
    Variables(props: VariablesProps): VNode {
        const vars = useMemo(() => {
            return Object.entries(props).reduce(
                (accum, [key, value]) => `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
                ''
            );
        }, [props]);

        return h('style', { type: 'text/css' }, `:host { ${vars} }`);
    },
};
