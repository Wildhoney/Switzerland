import * as utils from './utils.js';

/**
 * @function window ∷ String → (Props → Props)
 */
export default url => {
    const ref = typeof window === 'undefined' ? null : window;

    return function window(props) {
        if (typeof require === 'undefined') {
            return { ...props, window: ref };
        }

        const { JSDOM } = require('jsdom');
        const dom = new JSDOM('', { url: utils.normaliseUrl(url) });
        return { ...props, window: dom.window };
    };
};
