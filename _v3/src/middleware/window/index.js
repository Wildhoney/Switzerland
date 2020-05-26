import * as utils from './utils.js';

/**
 * @function window ∷ String → (Props → Props)
 */
export default (url) => {
    return async function window(props) {
        if (!props.utils.isHeadless) return props;

        const dom = await import('jsdom');
        const { window } = new dom.default.JSDOM('', { url: utils.normaliseUrl(url) });
        return { ...props, window };
    };
};
