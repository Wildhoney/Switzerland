import { Router } from 'director';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { create, pipe, element } from '../switzerland';
import { html, attrs, validate, once, transclude } from '../middleware';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    async: true,
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

    create('router-link', pipe(attrs, transclude, styles, validate(propTypes), html(props => {

        return element('a', {
            onclick: () => router.setRoute(props.attrs.to)
        }, props.children);

    })));

    // create('router-view', html(() => {
    //
    // }));

});
