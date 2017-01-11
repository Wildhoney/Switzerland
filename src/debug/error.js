import starwars from 'starwars';

/**
 * @param {Number} [errorPercentage = 50]
 * @return {Object}
 */
export default (errorPercentage = 50) => {

    return props => {

        Math.random() < (errorPercentage / 100) && (message => {
            console.error(`Switzerland Debug: Throwing ${message}.`);
            throw new Error(message);
        })(starwars());

        return props;

    };

};
