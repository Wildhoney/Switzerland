/**
 * @function options ∷ Map
 */
export const options = new Map([['enabled', false], ['threshold', -Infinity]]);

/**
 * @function print ∷ HTMLElement → Timings → void
 */
export const print = (node, timings) => {
        if (timings.total < options.get('threshold')) {
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
            console.log(
                `${name} %c(${duration.toFixed(3)}ms)`,
                `color: darkgray`
            );
        });
        console.groupEnd(group);
}

/**
 * @function setup ∷ void → void
 */
export const setup = () => {
        window.swiss = {
            enable: () => void options.set('enabled', true),
            disable: () => void options.set('enabled', false),
            threshold: value => void options.set('threshold', value)
        };
};
