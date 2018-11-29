const cache = new Map();

/**
 * @function loader ∷ Props p ⇒ Object String String → (p → Promise p)
 * ---
 * Takes an object of image paths and waits for them to be fully downloaded into the browser's cache before
 * handing over to the subsequent middleware. Appends the "src" object to the props for consumption by the component.
 */
export default function loader(sources) {
    return async props => {
        await Promise.all(
            Object.values(sources).map(src => {
                return (
                    cache.get(src) ||
                    new Promise(resolve => {
                        const img = new window.Image();
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', resolve);
                        img.setAttribute('src', src);
                        cache.set(src, img);
                    })
                );
            })
        );

        return { ...props, loader: sources };
    };
}
