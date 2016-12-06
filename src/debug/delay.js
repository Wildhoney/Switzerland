/**
 * @param {Number} by
 * @return {Object}
 */
export default by => {

    return props => {
        return new Promise(resolve => setTimeout(() => resolve(props), by));
    };

};
