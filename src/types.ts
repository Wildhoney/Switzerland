import { DOMWindow } from 'jsdom';
import * as server from './core/server';

export type Attributes = { [key: string]: string };

export type Child = null | string | Node;

export type Children = Child[];

export type Node = { element: Element; attributes: Attributes; children: Children };

export type View = (props: Props) => null | Child;

export type Element = string | server.Swiss;

export type Props = {
    node: HTMLElement;
    lifecycle: 'mount' | 'unmount' | 'update';
    server: boolean;
    render: () => null;
    window: Window | DOMWindow;
    dispatch: EventDispatch;
};

export type EventName = string;

export type EventPayload = object | string;

export type EventOptions = { [key: string]: string };

export type EventDispatch = (name: EventName, payload: EventPayload, options?: EventOptions) => void;
