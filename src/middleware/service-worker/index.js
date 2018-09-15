import once from '../once/index.js';

/**
 * @function serviceWorker ∷ Props p ⇒ String → String → (p → Promise p)
 */
export default function serviceWorker(type, path, scope) {
    return once(async props => {
        try {
            switch (type) {
                case 'service':
                    navigator.serviceWorker &&
                        (await navigator.serviceWorker.register(path, {
                            scope
                        }));
                    return props;
            }
        } catch (err) {
            return props;
        }
    });
}
