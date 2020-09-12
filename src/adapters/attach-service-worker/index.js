/**
 * @function attachServiceWorker
 * ---
 * Attaches the service worker with the ability to pass a model to the worker via the second argument.
 * If the second argument is a function then it's invoked, which allows you to parse the HTML from
 * the node after it has been rendered.
 */
export default function attachServiceWorker({ boundableAdapters, ...props }) {
    return (path, getModel = {}) => {
        if (typeof window === 'undefined') return null;

        const run = boundableAdapters.run(props);

        run.onRender(() => {
            const params = new URLSearchParams();
            const model = typeof getModel === 'function' ? getModel(props.node) : getModel;

            Object.entries(model).forEach(([key, value]) =>
                params.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
            );

            const args = Object.values(model).length === 0 ? '' : `?${params.toString()}`;
            const url = new URL(args, path).href;
            navigator.serviceWorker.register(url);
        });
    };
}
