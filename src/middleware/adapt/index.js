/**
 * @function getObserver ∷ ResizeObserver|void
 */
const getObserver = () =>
    'ResizeObserver' in window &&
    window.ResizeObserver &&
    new window.ResizeObserver((entries) =>
        entries.forEach((entry) => entry.target.render({ adapt: entry.contentRect }))
    );

/**
 * @constant nodes ∷ WeakSet
 */
export const nodes = new WeakSet();

/**
 * @function adapt ∷ Props p ⇒ (p → p)
 * ---
 * Hooks up the host node to the `ResizeObserver` observer which allows for element queries where components are
 * re-rendered whenever their dimensions change, rather than when the page's dimension changes. This allows for
 * responsiveness on an element-level, where for example an element is placed in a 200px space it can render
 * differently than when it's placed in a 400px space.
 */
export default () => {
    const observer = getObserver();

    return function adapt(props) {
        const { lifecycle, utils } = props;

        if (utils.isHeadless) {
            return props;
        }

        switch (lifecycle) {
            case 'mount':
                nodes.add(props.node);
                observer && observer.observe(props.node);
                break;
            case 'unmount':
                nodes.delete(props.node);
                observer && observer.unobserve(props.node);
                break;
        }

        return props;
    };
};
