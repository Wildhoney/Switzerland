export const createElements = ({ props }) => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    return { ...props, e: { form, input } };
};
