export function pluralise(count, word) {
    switch (count) {
        case 1:
            return word;
        default:
            return `${word}s`;
    }
}

export function isBottom({ attrs }) {
    return attrs.logo === 'bottom';
}
