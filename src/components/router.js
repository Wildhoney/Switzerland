import { Router } from 'director';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { create, pipe, element } from '../switzerland';
import { html, attrs, validate, once, transclude, methods } from '../middleware';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    async: true,
    html5history: true
};

/**
 * @method routerData
 * @type {Map}
 */
const routerData = new Map();
routerData.set('views', new Set());
routerData.set('lastRoute', null);

/**
 * @method register
 * @param {Object} props
 * @return {Object}
 */
function register(props) {
    routerData.get('views').add(props.node);
    return props;
}

/**
 * @method change
 * @param {Object} props
 * @return {void}
 */
function change(props) {
    const [children] = props.args;
    props.render({ children });
}

/**
 * @param {Object} routes
 * @return {Object}
 */
export default R.once((routes, options = defaultOptions) => {

    const router = Router(routes).configure({ ...defaultOptions, ...options }).init();

    /**
     * @constant propTypes
     * @type {Object}
     */
    const propTypes = {
        children: PropTypes.object.isRequired,
        attrs: PropTypes.shape({
            href: PropTypes.string.isRequired
        }).isRequired
    };

    /**
     * @constant routerLinkStyles
     * @param {Object} props
     * @return {Object}
     */
    const routerLinkStyles = once(props => {

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

    create('router-link', pipe(attrs, transclude, routerLinkStyles, validate(propTypes), html(props => {
        return <a onclick={() => router.setRoute(props.attrs.href)}>{props.children}</a>;
    })));

    /**
     * @constant routerViewStyles
     * @param {Object} props
     * @return {Object}
     */
    const routerViewStyles = once(props => {

        const styleNode = document.createElement('style');
        styleNode.setAttribute('type', 'text/css');
        styleNode.innerHTML = `
            :host {
                display: inline-block;
                
                --router-view-loading: {
                    display: none;
                };
                
                --router-view-loaded: {
                    display: block;
                };
            }
        
            section :first-child:not(.loaded) {
                @apply --router-view-loading;
            }
        
            section :first-child.loaded {
                @apply --router-view-loaded;
            }
        `;

        props.node.shadowRoot.appendChild(styleNode);
        return props;

    });

    create('router-view', pipe(once(register), routerViewStyles, methods({ change }), html(props => {
        return <section>{routerData.get('lastRoute') || props.children}</section>;
    })));

});

export const route = html => {

    return () => {

        routerData.set('lastRoute', html);

        Array.from(routerData.get('views').values()).forEach(node => {
            node.change(html);
        });

    };

};
