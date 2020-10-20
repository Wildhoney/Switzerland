import * as utils from './utils.js';

/**
 * @function path
 * ---
 * Handles the logic of specifying relative and absolute paths (depending on context) to the current
 * component. Functions both on the client side automatically, and the server side using the `options`
 * parameter of the `render` and `renderToStream` functions.
 */
export default async function path({ server, options }) {
    const path = server ? await import('path') : null;

    return (url) => {
        if (!server) return utils.getPath(url);

        const parsed = path.parse(url.replace('file://', ''));
        const relative = path.relative(options.root, parsed.dir);
        const location = new URL(relative, options.path).href;

        return utils.getPath(location.endsWith('/') ? location : `${location}/`);
    };
}
