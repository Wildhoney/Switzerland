import { newState } from '../state/index.js';

export const nodes = new WeakSet();

const observer =
    typeof window !== 'undefined' &&
    new window.IntersectionObserver((entries) =>
        entries.forEach((entry) => entry.target.render({ [newState]: { intersect: entry.contentRect } }))
    );

/**
 * @function adapt
 * ---
 * Hooks up the host node to the `IntersectionObserver` which determines how much of the node is currently
 * visible in the DOM. This allows for clever adaptations, such as a video changing its state between play
 * and pause depending on the amount of the video is visible (think Facebook). You can also use it to lazy-load
 * images based on the intersection details.
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

        return props;
    };
};
