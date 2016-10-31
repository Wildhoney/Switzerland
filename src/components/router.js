import { Router } from 'director';
import { create as createComponent, pipe, element } from '../switzerland';
import { html, attrs, validate } from '../middleware';
import PropTypes from 'prop-types';

/**
 * @constant options
 * @type {Object}
 */
const options = {
    html5history: true
};

/**
 * @param {Object} routes
 * @return {Object}
 */
export default routes => {

    const router = Router(routes).configure(options);
    router.init();

    /**
     * @constant propTypes
     * @type {Object}
     */
    const propTypes = {
        attrs: PropTypes.shape({
            to: PropTypes.string.isRequired
        }).isRequired
    };

    createComponent('router-link', pipe(attrs, validate(propTypes), html(props => {
        return <a onclick={() => router.setRoute(props.attrs.to)}>{props.children}</a>;
    })));

    // createComponent('router-view', html(() => {
    //
    // }));

};
