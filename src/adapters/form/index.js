import * as utils from './utils.js';

const cache = new WeakMap();

/**
 * @function form
 */
export default function form({ boundableAdapters, ...props }) {
    return () => {
        const { render, node } = props;
        const rendered = boundableAdapters.on.rendered(props);

        rendered(() => {
            //  Gather all of the rendered forms so we can re-render on first mount.
            const forms = [...(node.shadowRoot ?? node).querySelectorAll('form')];

            // Set the cache for the node which will memorise the forms seen.
            !cache.has(node) && cache.set(node, new Set());

            // Don't continue if we've seen every discovered form previously.
            if (forms.every((form) => cache.get(node).has(form))) return null;

            // Add all of the discovered forms to the cache.
            for (const form of forms) cache.get(node).add(form);

            // Finally re-render the component as we have a new list of forms.
            render();
        });

        // Yield the forms that we discovered for this node tree.
        return utils.toMap([...(cache.get(node) ?? [])]);
    };
}
