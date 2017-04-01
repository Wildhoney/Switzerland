/**
 * @constant listeners
 * @type {Map}
 */
const listeners = new Map();

/**
 * @method addEventListener
 * @param {String|Symbol} name
 * @param {Function} fn
 * @return {void}
 */
export const addEventListener = (name, fn) => {
    !listeners.has(name) && listeners.set(name, new Set());
    listeners.get(name).add(fn);
};

/**
 * @method removeEventListener
 * @param {String|Symbol} name
 * @param {Function} fn
 * @return {void}
 */
export const removeEventListener = (name, fn) => {
    listeners.get(name).delete(fn);
};

/**
 * @method dispatchEvent
 * @param {String|Symbol} name
 * @param {*} data
 * @return {void}
 */
export const dispatchEvent = (name, data) => {
    listeners.get(name).forEach(listener => listener(data));
};
