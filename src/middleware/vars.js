import { decamelize } from 'humps';

/**
 * @constant nodes
 * @type {WeakMap}
 */
const nodes = new WeakMap();

/**
 * @method parse
 * @param {Object} props
 * @return {String}
 */
const parse = props => {

    return `${Object.keys(props).map(key => {
        const name = decamelize(key, { separator: '-' });
        return `--${name}: ${props[key]}; `;
    }).join('').trim()}`;

};

/**
 * @param {Function} fn
 * @return {Function}
 */
export default fn => {

    return props => {

        const hasNode = nodes.has(props.node);
        !hasNode && nodes.set(props.node, document.createElement('style'));

        const styleNode = nodes.get(props.node);
        !hasNode && styleNode.setAttribute('type', 'text/css');

        // Update the style's HTML content, and then append it to the root node, if it doesn't
        // already exist there.
        styleNode.innerHTML = `:host { ${parse(fn(props))} }`;
        !styleNode.isConnected && props.node.shadowRoot.appendChild(styleNode);

        return props;

    };

};
