import once from '../once/index.js';

/**
 * @function serviceWorker ∷ Props p ⇒ String → String → (p → Promise p)
 */
export default function serviceWorker(path, scope) {
    return once(async props => {
        try {
            navigator.serviceWorker &&
                (await navigator.serviceWorker.register(path, {
                    scope
                }));
            return props;
        } catch (err) {
            return props;
        }
    });
}
