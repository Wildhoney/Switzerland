/**
 * @constant statuses
 * @type {Object}
 */
export const statuses = { ok: 1, error: 2 };

/**
 * @constant statusKey
 * @type {Symbol}
 */
export const statusKey = Symbol('switzerland/status');

/**
 * @method isOk
 * @param {Object} props
 * @return {Boolean}
 */
export const isOk = props => {
    return Boolean(props[statusKey] & statuses.ok);
};

/**
 * @method isError
 * @param {Object} props
 * @return {Boolean}
 */
export const isError = props => {
    return Boolean(props[statusKey] & statuses.error);
};

