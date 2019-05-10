export default url => {
    return function window(props) {
        if (typeof require === 'undefined') {
            return { ...props, window };
        }

        const { JSDOM } = require('jsdom');
        const dom = new JSDOM('', { url });
        return { ...props, window: dom.window };
    };
};
