export const rollDice = ({ props }) => ({
    ...props,
    rolled: Math.ceil(Math.random() * 6)
});
