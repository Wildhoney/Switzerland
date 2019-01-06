/**
 * @function getObserver ∷ IntersectionObserver|void
 */
const getObserver = () =>
    'IntersectionObserver' in window &&
    new window.IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.render({ intersect: entry }));
    });

/**
 * @constant observers ∷ WeakSet
 */
export const observers = new WeakSet();

/**
 * @function intersect ∷ Props p ⇒ (p → p)
 * ---
 * Hooks up the host node to the `IntersectionObserver` which determines how much of the node is currently
 * visible in the DOM. This allows for clever adaptations, such as a video changing its state between play
 * and pause depending on the amount of the video is visible (think Facebook). You can also use it to lazy-load
 * images based on the intersection details.
 */
export default function intersect() {
    const observer = getObserver();

    return props => {
        const { lifecycle } = props;

        switch (lifecycle) {
            case 'mounted':
                observers.add(props.node);
                observer && observer.observe(props.node);
                break;
            case 'unmounted':
                observers.delete(props.node);
                observer && observer.unobserve(props.node);
                break;
        }

        return props;
    };
}
