import dom from 'jsdom';

export function getWindow() {
    if (typeof window !== 'undefined') return window;
    return new dom.JSDOM().window;
}

export function consoleMessage(text, type = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);
}
