import { useSimpleState, useReduxState } from './utils.js';

export default async function state({ node, render }) {
    const bind = await (async () => {
        try {
            const { bindActionCreators } = await import('redux');
            return bindActionCreators;
        } catch {
            return () => {};
        }
    })();

    return (mapOrStore, options = {}) => {
        const isStore = typeof mapOrStore?.subscribe === 'function';

        return isStore
            ? useReduxState({ store: mapOrStore, options: { bind, ...options }, node, render })
            : useSimpleState({ map: mapOrStore, render });
    };
}
