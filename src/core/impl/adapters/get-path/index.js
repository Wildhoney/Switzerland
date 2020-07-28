import { serverOptions } from '../../../index.js';
import * as utils from './utils.js';

export default function getPath({ server }) {
    return async (url) => {
        if (!server) return utils.getPath(url);

        const path = await import('path');
        const parsed = path.parse(url.replace('file://', ''));
        const relative = path.relative(serverOptions.get('root'), parsed.dir);
        const location = new URL(relative, serverOptions.get('path')).href;

        return utils.getPath(location.endsWith('/') ? location : `${location}/`);
    };
}
