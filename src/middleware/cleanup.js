import { options } from '../switzerland';
import once from './once';

export default fn => {

    const cleanupFn = once(fn, options.RESET);

    return props => {

        // Invoke the function if the node isn't connected to the DOM.
        return props.node.isConnected ? props : { ...cleanupFn(props), ...props };

    };

};
