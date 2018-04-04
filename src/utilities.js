/**
 * @method validate ∷ ∀ a. Object String a → [String] → Object String a
 * @param {String} event
 * @param {String} [nodeNames = ['input', 'textarea', 'select']]
 * @return {void}
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

        // Map each of the validity reports into an object where the key is the name of the element.
        const validityAnalysis = fields.reduce((xs, node) => ({ ...xs, [node.getAttribute('name')]: node.validity }), {});
        const isFormValid = Object.values(results).some(({ valid }) => valid);

        return { results: validityAnalysis, valid: isFormValid };

    } catch (err) {

        // Yield an indeterminate result as an error was raised in the above code.
        return { results: [], valid: null };

    }

};
