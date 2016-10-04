/**
 * @param {Object} props
 * @return {Object}
 */
export default props => {

    return { ...props, event: (name, model) => {

        const eventName = `${props.node.nodeName.toLowerCase()}/${name}`;

        props.node.dispatchEvent(new window.CustomEvent(eventName, {
            detail: Object.freeze(model),
            bubbles: true,
            composed: true
        }));

    } };

};
