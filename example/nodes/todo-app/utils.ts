import { useEffect } from 'preact/hooks';
import { use } from 'switzerland';

export function useResize(): null | { width: number; height: number } {
    const env = use.env();
    const [state, setState] = use.state<null | ResizeObserverEntry['contentRect']>(null);

    useEffect(() => {
        const observer = new window.ResizeObserver((entries) =>
            entries.forEach(function useResize(entry) {
                setState(entry.contentRect);
            })
        );

        observer.observe(env.node);

        return () => observer.unobserve(env.node);
    }, [env.node]);

    return state;
}

// export async function createServiceWorker({ path, window }) {
//     try {
//         window.navigator.serviceWorker &&
//             (await window.navigator.serviceWorker.register(path('../../../utils/worker.js'), {
//                 scope: '/',
//             }));
//     } catch {}
// }
