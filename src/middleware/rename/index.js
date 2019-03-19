import * as u from './utils.js';

export default function rename(name, middleware) {
    return async props => {
        const newProps = (await middleware)(props);
        const diff = u.difference(Object.keys(props), Object.keys(newProps));
        const take = u.take(diff);
        const drop = u.drop(diff);

        switch (diff.length) {
            case 0:
                return newProps;
                case 1:
                    return { ...drop(newProps), [name]: newProps[diff[0]] };
                    case 2:
                        return { ...drop(newProps), [name]: take(newProps) };
        }
    };
}
