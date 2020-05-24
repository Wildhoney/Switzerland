import { Swiss } from './create';

export type Tag = string | Node | ChildNode | Swiss;

export type ChildNode = (props: Properties) => HTMLElement;

export type Tree = [Tag, Properties, Tree[]];

export type Properties = { [key: string]: string };

type Children = number | string | ((props: Properties) => Tree) | Text | Tree;

export type Component = {
    name: string;
};

class Node {
    name: string;

    constructor(name) {
        this.name = name;
    }
}

export default function h(
    tag: Tag,
    attrs: Properties = {},
    children: Children | Children[] = []
): Tree {
    const isString = typeof tag === 'string';
    return [isString ? new Node(tag) : tag, attrs, [].concat(children)];
}
