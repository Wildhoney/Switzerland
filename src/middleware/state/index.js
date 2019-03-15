import * as u from './utils.js';

export default () => {
    return props => ({ ...props, state: u.useState(props) });
};
