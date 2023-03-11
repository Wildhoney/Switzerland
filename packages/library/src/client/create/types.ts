import { VNode } from "preact";

export type Tree<Attrs> = (attrs: Attrs) => VNode;

export type RenderOptions = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
  isClient: boolean;
  isServer: boolean;
};
