/**
 * @function attrs
 * ---
 * Takes an optional list of excluded attributes that will be ignored when their values are mutated, such as you
 * may not want the component to re-render when class names are modified, such as the "resolved" class name that
 * Switzerland adds when a component has been resolved.
 *
 * The 'attrs' middleware parses all of the attributes defined on the host node, and augments the passed props with
 * their values. It also observes the attributes using the 'MutationObserver' to re-render the component when any
 * of the non-excluded attributes are modified.
 */

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
