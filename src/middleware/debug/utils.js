export const ident = Symbol('@switzerland/debug');

/**
 * @function printTimings ∷ HTMLElement → Timings → void
 */
export const printTimings = (node, timings) => {
    const group = `${node.nodeName.toLowerCase()} %c(${(
        timings.end - timings.start
    ).toFixed(3)}ms)`;
    console.groupCollapsed(group, 'font-weight: normal; color: darkgray');
    console.groupCollapsed('meta');
    console.trace();
    console.groupEnd('meta');
    timings.records.forEach(({ name, duration }) => {
        console.log(`${name} %c(${duration.toFixed(3)}ms)`, `color: darkgray`);
    });
    console.groupEnd(group);
};

export const now = () => window.performance.now();
