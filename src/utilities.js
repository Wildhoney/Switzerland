/**
 * @method message ∷ ∀ a. Object String a → [String] → Object String a
 * @param {String} message
 * @param {String} type
 * @return {void}
 *
 * Takes a message and an optional console type for output. During minification this function will be removed
 * from the generated output if 'NODE_ENV' is defined as 'production', as it will be unused due to 'process.env'
 * checks later on in the code.
 */
export const validate = (event, elements = ['input', 'textarea', 'select']) => {

    const form = event.path.find(node => node instanceof HTMLFormElement);
    const fields = Array.from(form.querySelectorAll(elements.map(name => `${name}[name]:not(:disabled)`).join(', ')));
    const results = fields.reduce((xs, node) => ({ ...xs, [node.getAttribute('name')]: node.validity }), {});

    return { results, valid: Object.values(results).some(({ valid }) => valid) };

};
