export const initialState = { text: '' };

export function createMethods(state) {
    return {
        setText(text) {
            return { ...state, text };
        },
    };
}
