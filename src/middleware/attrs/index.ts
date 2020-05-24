import { Middleware } from '../../core/create';
import * as utils from './utils';

export type Attributes = { [key: string]: string | null };

export type Types = {
    [key: string]: ((string) => any) | [(string) => any, any];
};

export default function attrs(types: Types = {}): Middleware {
    const defaults = utils.getDefaults(types);

    return (props) => {
        if (props.server) {
            return props;
        }

        return {
            ...props,
            attrs: utils.getAttributes(props.node.attributes, types, defaults),
        };
    };
}
