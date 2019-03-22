/**
 * @constant options ∷ Map
 */
const options = new Map([['enabled', false]]);

/**
 * @function print ∷ HTMLElement → Timings → Promise void
 */
export const print = async (...args) => {
    if (options.get('enabled')) {
        const debug = await import('./utils.js');
        debug.print(...args);
    }
};

// Attach the Switzerland debugger to the `window` object.
window.swiss = {
    enable: () => void options.set('enabled', true),
    disable: () => void options.set('enabled', false)
};
