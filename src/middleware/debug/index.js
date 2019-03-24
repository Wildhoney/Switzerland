import * as u from './utils.js';
import { meta } from '../../core/utils.js';

export default () => {
    const debug = async function debug({ node, utils, props }) {
        const middleware = await utils.getMiddleware();
        const index = middleware.findIndex(m => m === debug);
        const isFirst = debug === middleware.find(m => m[meta] === u.ident);
        const isLast =
            debug === [...middleware].reverse().find(m => m[meta] === u.ident);

        if (isFirst)
            return {
                ...props,
                debug: { start: u.now(), previous: u.now(), index, records: [] }
            };

        const names = middleware
            .slice(props.debug.index + 1, index)
            .map(({ name }, index) => name || `ƒ[${index}]`);

        const records = {
            ...props.debug,
            end: u.now(),
            previous: u.now(),
            index,
            records: [
                ...props.debug.records,
                {
                    name: names.join(' → '),
                    duration: u.now() - props.debug.previous
                }
            ]
        };

        isLast && u.printTimings(node, records);
        return { ...props, debug: records };
    };

    debug[meta] = u.ident;
    return debug;
};
