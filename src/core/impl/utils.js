import * as debug from '../debug/index.js';

/**
 * @function printTimings ∷ HTMLElement → Timings → void
 */
export const printTimings = (node, timings) => {
    if (timings.total < debug.options.get('threshold')) {
        return;
    }

    const group = `${node.nodeName.toLowerCase()} %c(${timings.total.toFixed(
        3
    )}ms)`;
    console.groupCollapsed(group, 'font-weight: normal; color: darkgray');
    console.groupCollapsed('meta');
    console.trace();
    console.groupEnd('meta');
    timings.records.forEach(({ name, duration }) => {
        console.log(`${name} %c(${duration.toFixed(3)}ms)`, `color: darkgray`);
    });
    console.groupEnd(group);
};
