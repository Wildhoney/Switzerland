import { VNode, h } from 'preact';
import renderToString from 'preact-render-to-string';
import { useState, useEffect, useReducer, useContext, createContext, Fragment } from 'preact/compat';
import { RenderOptions, Tree } from './types';

export { h } from 'preact';

const Env = createContext<RenderOptions>({ path: null, root: null });

export function render(vnode: VNode, options: RenderOptions) {
    return renderToString(h(Fragment, {}, h(Env.Provider, { value: options, children: vnode })));
}

export function create<Attrs extends Record<string, string>>(name: string, tree: Tree<Attrs>) {
    return function Tree(attrs: Attrs): VNode {
        return h(name, attrs, h('template', { shadowroot: 'open' }, h(tree, attrs)));
    };
}

export const use = {
    state: useState,
    effect: useEffect,
    reducer: useReducer,
    env: () => useContext(Env),
};
