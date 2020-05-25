import { Middleware } from '../../core/create';
import * as utils from './utils';

export type Attributes = { [key: string]: any | null };

export type Types = {
    [key: string]: ((string) => any) | [(string) => any, any];
};

export const nodes = new Set();

export default function attrs(
    types: Types = {},
    exclude: string[] = ['class', 'id', 'style']
): Middleware {
    const defaults = utils.getDefaults(types);

    return (props) => {
        const { node, lifecycle, render, server } = props;

        if (server) return props;

        if (!nodes.has(node)) {
            const observer = new window.MutationObserver(
                (mutations) => utils.hasApplicableMutations(node, mutations, exclude) && render()
            );

            observer.observe(node, {
                attributes: true,
                attributeOldValue: true,
            });

            nodes.add(node);
        }

        lifecycle === 'unmount' && nodes.delete(node);

        return {
            ...props,
            attrs: utils.getAttributes(node.attributes, types, defaults),
        };
    };
}
