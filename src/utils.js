import dom from 'jsdom';

export function getWindow() {
    if (typeof window !== 'undefined') return window;
    return new dom.JSDOM().window;
}
