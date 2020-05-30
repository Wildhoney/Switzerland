const cache = new Map();

export function getWindow() {
    if (typeof window !== 'undefined') return window;

    return (
        cache.get('window') ??
        new Promise(async (resolve) => {
            const dom = await import('jsdom');
            const window = new dom.default.JSDOM().window;
            cache.set('window', window);
            resolve(window);
        })
    );
}

export function consoleMessage(text, type = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);
}
