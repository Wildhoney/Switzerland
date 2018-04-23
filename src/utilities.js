import * as R from 'ramda';
import { toObject } from './middleware';

/**
 * @method once ∷ Event e ⇒ e → void
 * @param {Function} onceFn
 * @param {Function} [alwaysFn = e => e.preventDefault()]
 * @return {void}
 *
 * Prevents double-submitting of a form by wrapping the `fn` with Ramda's `once` function. The slight difference
 * between this method and Ramda's, is that Switzerland's `once` allows passing a second function that is always
 * invoked, which allows for techniques such as invoking `e.preventDefault` each and every time to stop the form
 * being submitted with its default behaviour, instead allowing the component to dictact how a form is submitted.
 */
const preventDefault = event => {
    const hasEvent = 'preventDefault' in toObject(event);
    hasEvent && event.preventDefault();
};

/**
 * @method once ∷ ∀ a b c. Event e ⇒ (e → a) → (e → b) → (Object String c → a)
 * @param {Function} fn
 * @param {Function} [alwaysFn = preventDefault]
 * @return {Function}
 *
 * Prevents double-submitting of a form by wrapping the `fn` with Ramda's `once` function. The slight difference
 * between this method and Ramda's, is that Switzerland's `once` allows passing a second function that is always
 * invoked, which allows for techniques such as invoking `e.preventDefault` each and every time to stop the form
 * being submitted with its default behaviour, instead allowing the component to dictact how a form is submitted.
 */
export const once = (fn, alwaysFn = preventDefault) => {

    const onceFn = R.once(fn);

    return event => {
        alwaysFn(event);
        return onceFn(event);
    };

};

/**
 * @method slots ∷ HTMLElement → [String] → [HTMLElement]
 * @param {HTMLElement} node
 * @param {Array<String>} names
 * @return {Array}
 *
 * A short and snappy function for retrieving a list of `HTMLSlotElement`s by the supplied name(s). Prevents excessive
 * boilerplate code using `querySelector`/`querySelectorAll` all of the time. Also unwraps the `NodeList` into a
 * standard JavaScript array.
 */
export const slots = (node, ...names) => {
    const selectors = R.flatten(names).map(name => `*[slot="${name}"]`);
    return Array.from(node.querySelectorAll(selectors));
};

/**
 * @method validate ∷ ∀ a. Object String a → [String] → Object String a
 * @param {String} event
 * @param {String} [nodeNames = ['input', 'textarea', 'select']]
 * @return {Object}
 *
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
        const validityReport = fields.reduce((xs, node) => ({ ...xs, [node.getAttribute('name')]: node.validity }), {});
        const isFormValid = Object.values(validityReport).every(({ valid }) => valid);

        return { results: validityReport, valid: isFormValid, error: null };

    } catch (err) {

        // Yield an indeterminate result as an error was raised in the above code.
        return { results: [], valid: null, error: err };

    }

};
