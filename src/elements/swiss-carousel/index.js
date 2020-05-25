import { create, init } from '../../index.js';
import middleware from './middleware.js';
import * as u from './utils.js';
import * as p from './partials.js';

const path = init(import.meta.url);

const tree = ({ attrs, props, h }) =>
    h('section', { class: attrs.direction }, [
        h('div', { class: 'track' }),
        !u.isTouchable() && p.controls(props),
        p.variables(props),
        h.sheet(path('./css/index.css')),
    ]);

export default create('swiss-carousel', ...middleware(tree));
