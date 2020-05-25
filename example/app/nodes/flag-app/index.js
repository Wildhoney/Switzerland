import { create, init } from '/vendor/index.js';
import middleware from './middleware.js';
import header from './partials/header.js';
import result from './partials/result.js';
import images from './partials/images.js';

const path = init(import.meta.url);

const tree = ({ countries, h, props }) => {
    const isComplete = countries.answered.length === countries.all.length;

    return h('section', { class: 'flag-app container' }, [
        h.sheet(path('./styles/index.css')),
        h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
        h('section', { class: 'body' }, [
            header(props),
            isComplete && result(props),
            !isComplete && images(props),
        ]),
    ]);
};

export default create('flag-app', ...middleware(tree));
