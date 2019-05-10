import * as utils from './utils';

export default (componentUrl, rootPath = null) => {
    return async function path(props) {
        return {
            ...props,
            path: utils.getPath(componentUrl, rootPath, props.window || window)
        };
    };
};
