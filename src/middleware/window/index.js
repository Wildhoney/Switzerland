import { init } from '../../index.js';
import { serverOptions } from '../../core/index.js';
import { getWindow } from '../../utils.js';

export default (url) => {
    return async function window(props) {
        const window = getWindow();

        if (!props.server) return { ...props, path: init(url), window };

        const path = await import('path');
        const parsed = path.parse(url.replace('file://', ''));
        const relative = path.relative(serverOptions.get('root'), parsed.dir);

        return {
            ...props,
            path: init(new URL(relative, serverOptions.get('path'))),
            window,
        };
    };
};
