/**
 * @function createQueue
 * ---
 * Encapsulated logic for handling the queuing system for components, where each component can only
 * have one active render cycle at any given time. Subsequent invocations to the `render` method are
 * queued and processed subsequently. Any errors that are thrown in the middleware cause the queue
 * to be emptied.
 */
export default function createQueue() {
    const queue = new Set();

    return {
        current: () => {
            const tasks = Array.from(queue);
            return tasks[tasks.length - 1];
        },
        push: (task) => queue.add(task),
        drop: (task) => queue.delete(task),
        dropAll: () => queue.clear(),
        isInvalid: (task) => !queue.has(task),
        isEmpty: () => queue.size === 0,
        size: () => queue.size,
    };
}
