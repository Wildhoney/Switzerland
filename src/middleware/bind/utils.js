export function getKey() {
    try {
        throw new Error();
    } catch (error) {
        return error.stack.split('\n')[3];
    }
}
