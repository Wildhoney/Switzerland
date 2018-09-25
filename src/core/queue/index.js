export default () => {

    const queue = window.set = new Set;
    
    return {
        current: () => {
            const tasks = Array.from(queue);
            return tasks[tasks.length - 1];
        },
        push: task => queue.add(task),
        drop: task => queue.delete(task),
        dropAll: () => queue.clear(),
        isInvalid: task => !queue.has(task)
    };


};