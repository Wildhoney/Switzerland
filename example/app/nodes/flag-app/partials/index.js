import { init } from '/vendor/index.js';
import header from './header.js';
import result from './result.js';
import images from './images.js';

const path = init(import.meta.url);

export default ({ countries, e, h, props }) => {
    const isComplete = countries.answered.length === countries.all.length;

    return h('dialog', { class: 'flag-app' }, [
        h.sheet(path('../styles/index.css')),
        h.sheet(path('../styles/mobile.css'), '(max-width: 768px)'),
        h('section', { class: 'body' }, [
            header(props),
            isComplete && result(props),
            !isComplete && images(props)
        ])
    ]);
};
