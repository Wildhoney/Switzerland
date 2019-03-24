import * as u from './utils.js';
import { meta } from '../../core/utils.js';

export default () => {
    const debug = async function debug({ node, utils, props }) {
        const middleware = await utils.getMiddleware();
        const index = middleware.findIndex(m => m === debug);
        const isFirst = u.isFirst(debug, middleware);

        // Extract all of the names from the middleware functions.
        const names = !isFirst && u.extractNames(props, index, middleware);

        // Append the new timing record to the list of existing timing records.
        const records = !isFirst && u.appendRecord(props, index, names);

        // Print the timings when we have the last `debug` function in the middleware
        // list.
        u.isLast(debug, middleware) && u.printTimings(node, records);

        return { ...props, debug: isFirst ? u.newRecord(index) : records };
    };

    debug[meta] = u.ident;
    return debug;
};
