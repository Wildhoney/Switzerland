import * as u from './utils.js';

export const roll = ({ props }) => ({
    ...props,
    rolled: u.roll()
});
