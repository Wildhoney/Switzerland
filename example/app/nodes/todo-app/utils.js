export const pluralise = (count, word) => {
    switch (count) {
        case 1: return word;
        default: return `${word}s`;
    }
};