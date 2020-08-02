import * as utils from './utils.js';

export default function usePath({ server }, options) {
    return async (url) => {
        if (!server) return utils.getPath(url);

        const path = await import('path');
        const parsed = path.parse(url.replace('file://', ''));
        const relative = path.relative(options.root, parsed.dir);
        const location = new URL(relative, options.path).href;

        return utils.getPath(location.endsWith('/') ? location : `${location}/`);
    };
}
