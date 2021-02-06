import * as server from './core/server';

export type Attributes = { [key: string]: string };

export type Child = null | string | Node;

export type Children = Child[];

export type Node = { element: Element; attributes: Attributes; children: Children };

export type View = () => null | Child;

export type Element = string | server.Swiss;
