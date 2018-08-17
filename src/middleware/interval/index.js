import { types } from '../once/index.js';

/**
 * @function interval ∷ Props p ⇒ Number → [(p → p)]
 * ---
 * Re-renders the component specified by the milliseconds. As this middleware uses both mount and unmount
 * parts, it yields an array which should be spread (...) when using as a middleware item.
 */
export default function interval(milliseconds) {

    const interval = new WeakMap();

    const mount = once(props => {

        // Use the `setInterval` to re-render the component every X milliseconds.
        interval.set(props.node, setInterval(props.render, milliseconds));

    }, ONCE.ON_MOUNT);

    const unmount = once(props => {

        // Stop the interval when the node is unmounted from the DOM.
        clearInterval(interval.get(props.node));

    }, ONCE.ON_UNMOUNT);

    return [mount, unmount];

}