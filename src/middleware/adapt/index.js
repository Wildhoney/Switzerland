const nodes = new WeakSet();

const state = new WeakMap();

const observer =
    typeof window !== 'undefined' &&
    new window.ResizeObserver((entries) =>
        entries.forEach((entry) => {
            state.set(entry.target, entry.contentRect);
            entry.target.render();
        })
    );

/**
 * @function adapt
 * ---
 * Hooks up the host node to the `ResizeObserver` observer which allows for element queries where components are
 * re-rendered whenever their dimensions change, rather than when the page's dimension changes. This allows for
 * responsiveness on an element-level, where for example an element is placed in a 200px space it can render
 * differently than when it's placed in a 400px space.
 */
export default () => {
    return function adapt(props) {
        if (props.server) return props;

        switch (props.lifecycle) {
            case 'mount':
                nodes.add(props.node);
                observer.observe(props.node);
                break;

            case 'unmount':
                nodes.delete(props.node);
                observer.unobserve(props.node);
                break;
        }

        return { ...props, adapt: state.get(props.node) ?? null };
    };
};
