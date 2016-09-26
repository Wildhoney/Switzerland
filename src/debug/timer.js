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
    const has = timers.has(props.node);
    const id = has ? timers.get(node) : `${node.nodeName.toLowerCase()} (${generate()})`;
    !has && timers.set(node, id);
    console.time(id);
    return { ...props, timer: id };

};

/**
 * @method timeEnd
 * @param {Object} props
 * @return {Object}
 */
export const timeEnd = props => {

    const id = timers.get(props.node);
    console.timeEnd(id);
    return { ...props, timer: id };

};
