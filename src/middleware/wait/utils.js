export const getApplicableNodes = (names, props) => {
    return [
        ...names.reduce(
            (accum, name) => [...accum, ...Array.from(props.boundary.querySelectorAll(name))],
            []
        ),
    ].filter((node) => !node.classList.contains('resolved'));
};

export const attachEventListener = (eventName, nodes, resolved, resolve) => {
    function listener({ detail: { node } }) {
        nodes.includes(node) && resolved.add(node);
        if (resolved.size === nodes.length) {
            document.removeEventListener(eventName, listener);
            resolved.clear();
            resolve();
        }
    }

    document.addEventListener(eventName, listener);
};
