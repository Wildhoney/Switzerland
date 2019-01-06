/**
 * @function interval ∷ Props p ⇒ Number → [(p → p)]
 * ---
 * Re-renders the component specified by the milliseconds.
 */
export default function interval(milliseconds) {
    const interval = new WeakMap();

    return ({ lifecycle, props }) => {
        switch (lifecycle) {
            case 'mounted':
                // Use the `setInterval` to re-render the component every X milliseconds.
                interval.set(
                    props.node,
                    setInterval(props.render, milliseconds)
                );
                break;

            case 'unmounted':
                // Stop the interval when the node is unmounted from the DOM.
                clearInterval(interval.get(props.node));
                break;
        }

        return props;
    };
}
