import { init } from '/vendor/index.js';
import list from './list.js';

const path = init(import.meta.url);

const nothing = ({ h }) =>
    h('li', { class: 'none' }, [
        h('p', {}, 'You have not added any todos yet.')
    ]);

export default ({ redux, h, props }) =>
    h('ul', {}, [
        !!redux.state.list.length && list(props),
        !redux.state.list.length && nothing(props),
        h.sheet(path('../styles/index.css')),
        h.sheet(path('../styles/mobile.css'), '(max-width: 768px)'),
        h.sheet(path('../styles/print.css'), 'print')
    ]);
