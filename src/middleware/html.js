/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {
        return { ...props, html: html(props) };
    };

};
