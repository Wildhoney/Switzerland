import { generate } from 'shortid';

/**
 * @constant timers
 * @type {WeakMap}
 */
const timers = new WeakMap();

/**
 * @method time
 * @param {Object} props
 * @return {Object}
 */
export const time = props => {

    const node = props.node;
    const hasTimer = timers.has(props.node);
    const id = hasTimer ? timers.get(node) : `${node.nodeName.toLowerCase()} (${generate()})`;
    !hasTimer && timers.set(node, id);
    window.console.time(id);
    return { ...props, timer: id };

};

/**
 * @method timeEnd
 * @param {Object} props
 * @return {Object}
 */
export const timeEnd = props => {

    const id = timers.get(props.node);
    window.console.timeEnd(id);
    return { ...props, timer: id };

};
