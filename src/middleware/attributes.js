/**
 * @constant observers
 * @type {WeakMap}
 */
const observers = new WeakMap();

export default props => {

    // Obtain the reference to the observer, using the WeakMap to query whether we have an existing
    // one to utilise before creating another.
    const observer = observers.get(props.node) || new MutationObserver(props.render);
    observer.observe(props.node, { attributes: true });
    observers.set(props.node, observer);

    // Parse all of the attributes on the node, and nested those into the props passed.
    const attrs = Object.keys(props.node.attributes).reduce((acc, index) => {
        const model = props.node.attributes[index];
        return { ...acc, [model.nodeName]: model.nodeValue };
    }, {});

    return { ...props, attrs };

};
