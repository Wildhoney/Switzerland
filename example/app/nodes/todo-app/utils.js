export function isBottom({ attrs }) {
    return attrs.logo === 'bottom';
}

export async function worker(props) {
    try {
        props.window.navigator.serviceWorker &&
            (await props.window.navigator.serviceWorker.register(
                props.path('../../../utils/worker.js'),
                {
                    scope: '/',
                }
            ));
        return props;
    } catch {
        return props;
    }
}
