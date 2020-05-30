import { getWindow } from '../../utils.js';

export default function window() {
    return async (props) => {
        return { ...props, window: await getWindow() };
    };
}
