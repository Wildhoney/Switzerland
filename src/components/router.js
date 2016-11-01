import { Router } from 'director';
import * as R from 'ramda';
import { create, pipe, element } from '../switzerland';
import { html, attrs, validate, once } from '../middleware';
import PropTypes from 'prop-types';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    html5history: true
};

/**
 * @param {Object} routes
 * @return {Object}
 */
export default R.once((routes, options = defaultOptions) => {

    const router = Router(routes).configure({ ...defaultOptions, ...options });
    router.init();

    /**
     * @constant propTypes
     * @type {Object}
     */
    const propTypes = {
        children: PropTypes.string.isRequired,
        attrs: PropTypes.shape({
            to: PropTypes.string.isRequired
        }).isRequired
    };

    /**
     * @constant styles
     * @param {Object} props
     * @return {Object}
     */
    const styles = once(props => {

        const styleNode = document.createElement('style');
        styleNode.setAttribute('type', 'text/css');
        styleNode.innerHTML = `
            :host {
                display: inline-block;
                
                --router-link-anchor: {
                    color: blue;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
            
            a {
                @apply --router-link-anchor;
            }
        `;

        props.node.shadowRoot.appendChild(styleNode);
        return props;

    });

    create('router-link', pipe(attrs, styles, validate(propTypes), html(props => {
        return <a onclick={() => router.setRoute(props.attrs.to)}>{props.children}</a>;
    })));

    // create('router-view', html(() => {
    //
    // }));

});
