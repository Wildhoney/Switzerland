import { DOMWindow } from 'jsdom';

export async function getWindow(): Promise<Window | DOMWindow> {
    if (typeof window !== 'undefined') return window as Window;

    {
        const dom = await import('jsdom');
        const { window } = new dom.default.JSDOM();
        return window as DOMWindow;
    }
}
