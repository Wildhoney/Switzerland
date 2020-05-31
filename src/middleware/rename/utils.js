export function difference(a, b) {
    return b.filter((c) => !a.includes(c));
}

export function drop(keys) {
    return (model) =>
        Object.entries(model).reduce(
            (accum, [key, value]) => (keys.includes(key) ? accum : { ...accum, [key]: value }),
            {}
        );
}

export function take(keys) {
    return (model) =>
        Object.entries(model).reduce(
            (accum, [key, value]) => (keys.includes(key) ? { ...accum, [key]: value } : accum),
            {}
        );
}
