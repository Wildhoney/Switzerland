/**
 * @function options ∷ Map
 */
export const options = new Map([['enabled', false], ['threshold', -Infinity]]);

/**
 * @function setup ∷ void → void
 */
export const setup = () => {
    window.swiss = {
        enable: () => void options.set('enabled', true),
        disable: () => void options.set('enabled', false),
        threshold: value => void options.set('threshold', value)
    };
};
