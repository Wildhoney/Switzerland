const nodes = new WeakSet();

const state = new WeakMap();

const observer =
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    new window.IntersectionObserver((entries) =>
        entries.forEach(function useIntersection(entry) {
            state.set(entry.target, entry.contentRect);
            entry.target.render();
        })
    );

/**
 * @function useIntersection
 * ---
 * Hooks up the host node to the `IntersectionObserver` which determines how much of the node is currently
 * visible in the DOM. This allows for clever adaptations, such as a video changing its state between play
 * and pause depending on the amount of the video is visible (think Facebook). You can also use it to lazy-load
 * images based on the intersection details.
 */
export default function useIntersection({ node, lifecycle, server }) {
    return () => {
        if (server) return null;

        switch (lifecycle) {
            case 'mount':
                nodes.add(node);
                observer.observe(node);
                break;

            case 'unmount':
                nodes.delete(node);
                observer.unobserve(node);
                break;
        }

        return state.get(node) ?? null;
    };
}
