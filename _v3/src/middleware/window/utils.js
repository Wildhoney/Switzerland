/**
 * @function normaliseUrl ∷ String → String
 */
export const normaliseUrl = (url) => {
    try {
        return url;
    } catch (error) {
        return new URL(url, 'swiss://0.0.0.0');
    }
};
