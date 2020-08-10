const nodes = new WeakMap();

/**
 * @function useInterval
 * ---
 * Re-renders the component every X milliseconds. Clears the interval on unmounting of the component
 * from the DOM.
 */
export default function useInterval({ node, lifecycle, render }) {
    return (milliseconds) => {
        switch (lifecycle) {
            case 'mount': {
                // Use the `setInterval` to re-render the component every X milliseconds.
                const interval = setInterval(render, milliseconds);
                nodes.set(node, interval);
                return interval;
            }

            case 'unmount':
                // Stop the interval when the node is unmounted from the DOM.
                clearInterval(nodes.get(node));
                break;
        }
    };
}
