import { meta } from '../../core/utils.js';

/**
 * @function ident ∷ Symbol
 * ---
 * Allows the `debug` middleware to locate other `debug` function middleware instances.
 */
export const ident = Symbol('@switzerland/debug');

/**
 * @function printTimings ∷ HTMLElement → Timings → void
 * ---
 * Function that's invoked when the last `debug` function is encountered, which will
 * finally print out all of the time measurements to the console.
 */
export const printTimings = (node, timings) => {
    const group = `${node.nodeName.toLowerCase()} %c(${(timings.end - timings.start).toFixed(
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

/**
 * @function printTimings ∷ void → Number
 * ---
 * Delegates to the `performance.now` function which is used for high precision
 * time measurement.
 */
export const getMetric = () => window.performance.now();

/**
 * @function newRecord ∷ ∀ a. Number → Object String a
 * ---
 * Initiates a record which will eventually contain all of the measurements for the current
 * middleware cycle.
 */
export const newRecord = (index) => ({
    start: getMetric(),
    previous: getMetric(),
    index,
    records: [],
});

/**
 * @function appendRecord ∷ ∀ a. Props p ⇒ p → Number → [String] → Object String a
 * ---
 * Appends a new time measurement to the records setup by the `newRcord` function. Invoked
 * repeatedly for each `debug` function that is encountered. Also holds the measurements for the
 * total time elapsed between the start and end `debug` functions.
 */
export const appendRecord = (props, index, names) => ({
    ...props.debug,
    index,
    records: [
        ...props.debug.records,
        {
            name: names.join(' → '),
            duration: getMetric() - props.debug.previous,
        },
    ],
    end: getMetric(),
    previous: getMetric(),
});

/**
 * @function extractNames ∷ ∀ a. Props p ⇒ p → Number → [p → p] → [String]
 * ---
 * Utility function for extracting the function names from the middleware in between the last
 * `debug` function, and the current `debug` function.
 */
export const extractNames = (props, index, middleware) =>
    middleware.slice(props.debug.index + 1, index).map(({ name }) => name || 'ƒ');

/**
 * @function isFirst ∷ ∀ a. Props p ⇒ (p → p) → [(p → p)] → Boolean
 * ---
 * Determines whether the current `debug` function is the first in the middleware list.
 */
export const isFirst = (debug, middleware) => debug === middleware.find((m) => m[meta] === ident);

/**
 * @function isLast ∷ ∀ a. Props p ⇒ (p → p) → [(p → p)] → Boolean
 * ---
 * Determines whether the current `debug` function is the last in the middleware list.
 */
export const isLast = (debug, middleware) =>
    debug === [...middleware].reverse().find((m) => m[meta] === ident);
