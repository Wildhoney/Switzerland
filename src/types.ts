import { VNode } from 'preact';

export type Props = {};

export type Tree<Attrs> = (attrs: Attrs) => VNode;

export type RenderOptions = { path: null | string; root: null | string };
