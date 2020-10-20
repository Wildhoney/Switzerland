export function isBottom(attrs) {
    return attrs.logo === 'bottom';
}

export async function createServiceWorker({ path, window }) {
    try {
        window.navigator.serviceWorker &&
            (await window.navigator.serviceWorker.register(path('../../../utils/worker.js'), {
                scope: '/',
            }));
    } catch {}
}
