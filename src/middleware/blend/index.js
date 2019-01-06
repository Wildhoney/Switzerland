/**
 * @function blend ∷ ∀ a b. Props p ⇒ (p → Object(String → a)) → (p → p)
 * ---
 * Allows user functions to be more general by automatically invoking the render function whenever
 * the promise yielded from the user function has been resolved.
 */
export default function blend(fn) {
    return props => {
        const future = fn(props);
        const isPromise = future instanceof Promise;

        switch (true) {
            case isPromise:
                future.then(props.render);
        }

        return props;
    };
}
