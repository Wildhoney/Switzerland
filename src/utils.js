/**
 * @function getWindow
 * ---
 * Either returns the current `window` object or the JSDOM implementation of window.
 */
export async function getWindow() {
    if (typeof window !== 'undefined') return window;

    {
        const dom = await import('jsdom');
        const { window } = new dom.default.JSDOM();
        return window;
    }
}

/**
 * @function consoleMessage
 * --
 * Log message of a given type to the console with additional formatting.
 */
export function consoleMessage(text, type = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);
}

/**
 * @function replaceTemplate
 * ---
 * Due to the limitation of JSDOM's `template` node not being able to receive children, we
 * create `swiss-template` nodes and then replace the string on output of the `render` function.
 */
export function replaceTemplate(html) {
    return html.replace(/swiss-template/g, 'template');
}

/**
 * @function getFormValidity
 * ---
 * Utility function for determining if a form is valid, and if not which named fields fail the
 * validation, the type of the validation failure and the browser default message for the failure.
 */
export function getFormValidity(form) {
    function getType(field) {
        for (var key in field.validity) {
            const isInvalid = key !== 'valid' && field.validity[key];
            if (isInvalid) return key;
        }
    }

    return [
        form.checkValidity(),
        Array.from(form.elements).reduce((accum, field) => {
            const isValid = field.checkValidity();
            return isValid || field.name === ''
                ? accum
                : { ...accum, [field.name]: { type: getType(field), message: field.validationMessage } };
        }, {}),
    ];
}
