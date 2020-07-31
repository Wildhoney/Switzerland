const nodes = new WeakMap();

/**
 * @function useInterval
 * ---
 * Re-renders the component specified by the milliseconds.
 */
export default function useInterval({ node, lifecycle, render }) {
    return (milliseconds) => {
        switch (lifecycle) {
            case 'mount':
                // Use the `setInterval` to re-render the component every X milliseconds.
                nodes.set(node, setInterval(render, milliseconds));
                break;

            case 'unmount':
                // Stop the interval when the node is unmounted from the DOM.
                clearInterval(nodes.get(node));
                break;
        }
    };
}
