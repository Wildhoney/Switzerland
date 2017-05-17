import compose from 'ramda/src/compose';

/**
 * @constant observers
 * @type {WeakMap}
 */
const observers = new WeakMap();

/**
 * @constant attributes
 * @type {WeakMap}
 */
const attributes = new WeakMap();

/**
 * @method removePrefix
 * @param {String} name
 * @return {String}
 */
const removePrefix = name => name.replace('data-', '');

/**
 * @constant excluded
 * @type {Array}
 */
const excluded = ['class', 'id'];

/**
 * @method kebabToCamel
 * @param {String} str
 * @return {String}
 */
export const kebabToCamel = str => str.replace(/(-\w)/g, match => match[1].toUpperCase());

/**
 * @method transform
 * @param {NamedNodeMap} attributes
 * @return {Object}
 */
const transform = attributes => {

    const isExcluded = index => {
        return !excluded.includes(attributes[index].nodeName);
    };

    return Object.keys(attributes).filter(isExcluded).reduce((acc, index) => {

        // Transform each attribute into a plain object.
        const model = attributes[index];
        const label = compose(kebabToCamel, removePrefix);

        return { ...acc, [label(model.nodeName)]: model.nodeValue };

    }, Object.create(null));

};

/**
 * @param {Object} props
 * @return {Object}
 */
export default props => {

    const { node, render } = props;

    // Obtain the reference to the observer, using the WeakMap to query whether we have an existing
    // one to utilise before creating another.
    const hasObserver = observers.has(node);
    const observer = hasObserver ? observers.get(node) : new window.MutationObserver(mutations => {

        const mutatedAttributes = mutations.map(model => model.attributeName);

        // Prevent a re-render of the component if every mutated attribute is included in the `excluded`
        // list.
        if (!mutatedAttributes.every(model => excluded.includes(model))) {

            // Remove the existing memorisation of the node's attributes before re-rendering.
            attributes.delete(node);
            render();

        }

    });

    observer.observe(node, { attributes: true });
    !hasObserver && observers.set(node, observer);

    // Parse all of the attributes on the node, and nested those into the props passed.
    const attrs = attributes.get(node) || transform(node.attributes);
    attributes.set(node, attrs);

    // Clean up the observer if the node is no longer present in the DOM.
    !props.attached && observer.disconnect();

    return { ...props, attrs };

};
