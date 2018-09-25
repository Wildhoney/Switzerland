/**
 * @function validate ∷ ∀ a. Object String a → [String] → Object String a
 * ---
 * Uses the built-in HTML validation rules for validating a given form based on the requirements specified
 * on the fields. To use the `validate` utility function it's important to set `novalidate` on the <form />
 * elment, otherwise you'll simply get the default behaviour for form validation, including the built-in
 * validation popups.
 */
export const validate = (event, nodeNames = ['input', 'textarea', 'select']) => {
    try {
        // Extend the selector to select only elements that have a `name` attribute and are NOT disabled, as
        // that's how traiditional forms function: elements without a name and/or disabled won't be submitted.
        const selector = nodeNames.map(name => `${name}[name]:not(:disabled)`).join(', ');

        // Find the first form that we encounter from the event, and then find all of the related fields using
        // the above selector.
        const form = event.composedPath().find(node => node instanceof HTMLFormElement);
        const fields = Array.from(form.querySelectorAll(selector));

        // Map each of the validity reports into an object where the key is the name of the element. We then perform
        // an `every` operation on the validity reports to see if each element in the form is valid.
        const validityReport = fields.reduce(
            (xs, node) => ({
                ...xs,
                [node.getAttribute('name')]: {
                    state: node.validity,
                    message: node.validationMessage
                }
            }),
            {}
        );
        const isFormValid = Object.values(validityReport).every(({ state }) => state.valid);

        return { results: validityReport, valid: isFormValid, error: null };
    } catch (err) {
        // Yield an indeterminate result as an error was raised in the above code.
        return { results: [], valid: null, error: err };
    }
};
