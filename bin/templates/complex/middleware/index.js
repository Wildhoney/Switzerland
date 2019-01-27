import * as u from '../utils/index.js';

export const roll = ({ props }) => ({
    ...props,
    rolled: u.roll()
});
