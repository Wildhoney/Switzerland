const observer =
    'IntersectionObserver' in window &&
    new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.render({ intersection: entry }));
    });

/**
 * @function intersect ∷ Props p ⇒ (p → p)
 * ---
 * Hooks up the host node to the `IntersectionObserver` which determines how much of the node is currently
 * visible in the DOM. This allows for clever adaptations, such as a video changing its state between play
 * and pause depending on the amount of the video is visible (think Facebook). You can also use it to lazy-load
 * images based on the intersection details.
 */
export default function intersect() {
    const observers = new WeakSet();

    return props => {
        if (!observers.has(props.node)) {
            observers.add(props.node);
            observer && observer.observe(props.node);
        }

        return props;
    };
}
