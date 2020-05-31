import * as utils from './utils.js';

/**
 * @function rename
 */
export default (name, middleware) => {
    return async function rename(props) {
        const newProps = await (await middleware)(props);
        const diff = utils.difference(Object.keys(props), Object.keys(newProps));
        const take = utils.take(diff);
        const drop = utils.drop(diff);

        switch (diff.length) {
            case 0:
                return newProps;
            case 1:
                return { ...drop(newProps), [name]: newProps[diff[0]] };
            default:
                return { ...drop(newProps), [name]: take(newProps) };
        }
    };
};
