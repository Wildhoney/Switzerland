import { getWindow } from '../../utils.js';

export default () => {
    return async function window(props) {
        return { ...props, window: await getWindow() };
    };
};
