import { useSimpleState, useReduxState } from './utils.js';

export default function state({ node, render }) {
    return (mapOrStore, options = {}) => {
        const isStore = typeof mapOrStore?.subscribe === 'function';

        return isStore
            ? useReduxState({ store: mapOrStore, options, node, render })
            : useSimpleState({ map: mapOrStore, render });
    };
}
