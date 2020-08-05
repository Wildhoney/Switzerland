export function getWindow() {
    if (typeof window !== 'undefined') return window;

    return new Promise(async (resolve) => {
        const dom = await import('jsdom');
        const { window } = new dom.default.JSDOM();
        resolve(window);
    });
}

export function consoleMessage(text, type = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);
}

export function replaceTemplate(html) {
    return html.replace(/swiss-template/g, 'template');
}
