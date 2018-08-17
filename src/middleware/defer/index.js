/**
 * @method function ∷ Props p ⇒ (p → p) → Number → (p → p)
 * ---
 * Invokes the function (likely a middleware function) after X milliseconds, unless the current render cycle
 * has been completed. It's useful for such things as only rendering a "Loading" message if the component is
 * taking a while to load for improved perception of speed.
 */
export function defer(fn, milliseconds) {
    return props => {
        setTimeout(
            async () => !(await props.resolved()) && fn(props),
            milliseconds
        );
        return props;
    };
}
