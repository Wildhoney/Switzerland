/**
 * @function run
 */
export default (lifecycle, getProps) => {
    return function run(props) {
        if (props.lifecycle === lifecycle) {
            return { ...props, ...getProps(props) };
        }

        return props;
    };
};
