/**
 * @function attachServiceWorker
 */
export default function attachServiceWorker({ boundableAdapters, ...props }) {
    return (path) => {
        if (typeof window === 'undefined') return null;

        const { node } = props;
        const run = boundableAdapters.run(props);

        run.onRender(() => {
            const resources = [...(node.shadowRoot ?? node).querySelectorAll('link')].map((link) =>
                link.getAttribute('href')
            );

            const params = new URLSearchParams();
            params.set('origin', window.location.origin);
            params.set('resources', JSON.stringify(resources.map((resource) => new URL(resource).pathname)));

            const url = new URL(`?${params.toString()}`, path).href;
            navigator.serviceWorker.register(url);
        });
    };
}
