const observer =
    'ResizeObserver' in window &&
    new ResizeObserver(entries => {
        entries.forEach(entry =>
            entry.target.render({ dimensions: entry.contentRect })
        );
    });

export const observers = new WeakSet();

/**
 * @function adapt ∷ Props p ⇒ (p → p)
 * ---
 * Hooks up the host node to the `ResizeObserver` observer which allows for element queries where components are
 * re-rendered whenever their dimensions change, rather than when the page's dimension changes. This allows for
 * responsiveness on an element-level, where for example an element is placed in a 200px space it can render
 * differently than when it's placed in a 400px space.
 */
export default function adapt() {
    return props => {
        if (!observers.has(props.node)) {
            observers.add(props.node);
            observer && observer.observe(props.node);
        }

        return props;
    };
}
