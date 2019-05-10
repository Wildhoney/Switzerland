export default url => {
    const ref = window;

    return function window(props) {
        if (typeof require === 'undefined') {
            return { ...props, window: ref };
        }

        const { JSDOM } = require('jsdom');
        const dom = new JSDOM('', { url });
        return { ...props, window: dom.window };
    };
};
