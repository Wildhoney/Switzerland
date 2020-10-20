import { useKeyValueState, useReduxStore } from './utils.js';

export default function state({ node, render }) {
    return (mapOrStore, options = {}) => {
        const isStore = typeof mapOrStore?.subscribe === 'function';

        return isStore
            ? useReduxStore({ store: mapOrStore, options, node, render })
            : useKeyValueState({ map: mapOrStore, render });
    };
}
