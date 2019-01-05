export default function blend(fn) {
    return props => {
        const future = fn(props);
        const isPromise = future instanceof Promise;

        switch (true) {
            case isPromise:
                future.then(props.render);
        }

        return props;
    };
}
