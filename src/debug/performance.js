import { isDevelopment } from '../helpers/env';

/**
 * @constant performanceKey
 * @type {Symbol}
 */
export const performanceKey = Symbol('switzerland/measurements');

/**
 * @constant measurements
 * @type {WeakMap}
 */
const measurements = new WeakMap();

/**
 * @method milliseconds
 * @return {Number}
 */
export const milliseconds = () => {

    if (isDevelopment()) {
        return 'performance' in window ? window.performance.now() : Date.now();
    }

    return 0;

};

/**
 * @method hasMiddleware
 * @return {Boolean}
 */
const hasMiddleware = props => performanceKey in props;

/**
 * @method measureFor
 * @param {String} key
 * @param {Object} props
 * @return {Function}
 */
export const measureFor = (key, props) => {

    if (!isDevelopment() || !hasMiddleware(props)) {
        return () => {};
    }

    return props[performanceKey](key);

};

/**
 * @method printFor
 * @param {HTMLElement} node
 * @return {Array}
 */
export const printFor = node => {

    if (!isDevelopment()) {
        return [];
    }

    const store = measurements.get(node);
    const data = Array.from(store.keys()).map(key => {

        const start = store.get(key).start;
        const end = store.get(key).end;

        return { key, milliseconds: end - start };

    });

    window.console.log(`🇨🇭 ${node.nodeName.toLowerCase()}:`);
    window.console.table(data);
    window.console.log('---');

    return data;

};

/**
 * @param {Object} props
 * @return {Object}
 */
export default props => {

    if (!isDevelopment()) {
        return props;
    }

    const node = props.node;
    const has = measurements.has(node);
    !has && measurements.set(node, new Map());
    const store = measurements.get(node);

    /**
     * @method time
     * @param {String} key
     * @return {Function}
     */
    const time = key => {

        const start = milliseconds();
        store.set(key, { start });

        return () => {
            const model = store.get(key);
            const end = milliseconds();
            store.set(key, { ...model, end });
            return end - start;
        };

    };

    return { ...props, [performanceKey]: time };

};
