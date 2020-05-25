/**
 * @function interval ∷ Props p ⇒ Number → [(p → p)]
 * ---
 * Re-renders the component specified by the milliseconds.
 */
export default (milliseconds) => {
    const nodes = new WeakMap();

    return function interval(props) {
        const { lifecycle } = props;

        switch (lifecycle) {
            case 'mount':
                // Use the `setInterval` to re-render the component every X milliseconds.
                nodes.set(props.node, setInterval(props.render, milliseconds));
                break;

            case 'unmount':
                // Stop the interval when the node is unmounted from the DOM.
                clearInterval(nodes.get(props.node));
                break;
        }

        return props;
    };
};
