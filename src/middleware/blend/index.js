/**
 * @function blend ∷ ∀ a b. Props p ⇒ (p → Object(String → a)) → (p → p)
 * ---
 * Allows user functions to be more general by automatically invoking the render function whenever
 * the promise yielded from the user function has been resolved.
 */
export default function blend(fn) {
    return function blend(props) {
        const { render } = props;
        const future = fn(props);
        const isPromise = future instanceof Promise;
        const isGenerator =
            fn.constructor &&
            ['AsyncGeneratorFunction', 'GeneratorFunction'].includes(
                fn.constructor.name
            );

        switch (true) {
            case isPromise:
                future.then(render);
                break;
            case isGenerator:
                (async function next() {
                    const { value, done } = await future.next(props);
                    render(value);
                    !done && next();
                })();
                break;
        }

        return props;
    };
}
