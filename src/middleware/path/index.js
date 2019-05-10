export default (componentUrl, rootPath) => {
    return async function path(props) {
        return {
            ...props,
            path: resourcePath => {
                if (typeof require === 'undefined') {
                    return new URL(resourcePath, componentUrl).href;
                }

                const componentPath = new URL(componentUrl).pathname;
                const relativePath = require('path').relative(rootPath(), componentPath);
                const urlPath = new URL(relativePath, (props.window || window).location.href);
                return new URL(resourcePath, urlPath).href;
            }
        };
    };
};
