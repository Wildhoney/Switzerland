export const roll = ({ props }) => ({
    ...props,
    rolled: Math.ceil(Math.random() * 6)
});
