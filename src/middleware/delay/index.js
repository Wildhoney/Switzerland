/**
 * @function delay ∷ Props p ⇒ Number → (p → Promise p)
 * ---
 * Pauses the middleware processing for the supplied milliseconds.
 */
export default function delay(milliseconds) {
    return async props => {
        // Use the `setTimeout` to pause the middleware by the given milliseconds.
        await new Promise(resolve =>
            setTimeout(() => resolve(props), milliseconds)
        );
        return props;
    };
}
