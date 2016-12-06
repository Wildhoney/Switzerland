import starwars from 'starwars';

/**
 * @param {Number} [value = 0.5]
 * @return {Object}
 */
export default (value = 0.5) => {

    return props => {

        Math.random() > value && (message => {
            throw new Error(message);
        })(starwars());

        return props;

    };

};
