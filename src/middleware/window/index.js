import { init } from '../../index.js';
import { serverOptions } from '../../core/index.js';
import { getWindow } from '../../utils.js';

export default (url) => {
    return async function window(props) {
        const window = await getWindow();

        if (!props.server) return { ...props, path: init(url), window };

        const path = await import('path');
        const parsed = path.parse(url.replace('file://', ''));
        const relative = path.relative(serverOptions.get('root'), parsed.dir);
        const location = new URL(relative, serverOptions.get('path')).href;

        return {
            ...props,
            path: init(location.endsWith('/') ? location : `${location}/`),
            window,
        };
    };
};
