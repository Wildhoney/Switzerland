/**
 * @constant htmlKey
 * @type {Symbol}
 */
export const htmlKey = Symbol('switzerland/html');

/**
 * @method htmlFor
 * @param {Object} model
 * @return {Object}
 */
export const htmlFor = model => {
    return htmlKey in model ? model[htmlKey] : model;
};

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {
        return { ...props, [htmlKey]: html(props) };
    };

};
