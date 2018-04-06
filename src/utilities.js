/**
 * @method validate ∷ ∀ a. Object String a → [String] → Object String a
 * @param {String} event
 * @param {String} [nodeNames = ['input', 'textarea', 'select']]
 * @return {Object}
 *
 * Takes a message and an optional console type for output. During minification this function will be removed
 * from the generated output if 'NODE_ENV' is defined as 'production', as it will be unused due to 'process.env'
 * checks later on in the code.
 */
export const validate = (event, nodeNames = ['input', 'textarea', 'select']) => {

    try {

        // Extend the selector to select only elements that have a `name` attribute and are NOT disabled, as
        // that's how traiditional forms function: elements without a name and/or disabled won't be submitted.
        const selector = nodeNames.map(name => `${name}[name]:not(:disabled)`).join(', ');

        // Find the first form that we encounter from the event, and then find all of the related fields using
        // the above selector.
        const form = event.path.find(node => node instanceof HTMLFormElement);
        const fields = Array.from(form.querySelectorAll(selector));

        // Map each of the validity reports into an object where the key is the name of the element. We then perform
        // an `every` operation on the validity reports to see if each element in the form is valid.
        const validityReport = fields.reduce((xs, node) => ({ ...xs, [node.getAttribute('name')]: node.validity }), {});
        const isFormValid = Object.values(validityReport).every(({ valid }) => valid);

        return { results: validityReport, valid: isFormValid, error: null };

    } catch (err) {

        // Yield an indeterminate result as an error was raised in the above code.
        return { results: [], valid: null, error: err };

    }

};

/**
 * @method slots ∷ HTMLElement → String → [HTMLElement]
 * @param {HTMLElement} node
 * @param {String} name
 * @return {Object}
 *
 * Utility method for retrieving slot element(s) by a given slot name.
 */
export const slots = (node, name) => {
    return Array.from(node.querySelectorAll(`*[slot="${name}"]`));
};