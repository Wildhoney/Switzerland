/**
 * @function run
 */
export default (lifecycle, getProps) => {
    return async function run(props) {
        if (props.lifecycle === lifecycle) {
            return { ...props, ...(await getProps(props)) };
        }

        return props;
    };
};
