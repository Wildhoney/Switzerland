import * as u from '../utils.js';

const completed = ({ redux, h }) =>
    h('li', {}, [
        h('em', {}, 'Completed: '),
        h(
            'span',
            {},
            `${redux.state.list.filter(x => x.done).length} of ${
                redux.state.list.length
            } ${u.pluralise(redux.state.list.length, 'task')}`
        )
    ]);

const position = ({ h, props }) =>
    h('li', {}, [
        h('em', {}, 'Logo: '),
        h(
            'a',
            {
                class: u.isBottom(props) ? 'active' : '',
                onclick: () => props.node.setAttribute('logo', 'bottom')
            },
            'Bottom'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !u.isBottom(props) ? 'active' : '',
                onclick: () => props.node.setAttribute('logo', 'top')
            },
            'Top'
        )
    ]);

const dimensions = ({ h, adapt }) =>
    h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(adapt.width)}×${Math.round(adapt.height)}`)
    ]);

const filter = ({ h, history }) =>
    h('li', {}, [
        h('em', {}, 'Complete: '),
        h(
            'a',
            {
                class: history.params.get('filter') ? '' : 'active',
                onclick: () => history.replace({}, '', '?filter=no')
            },
            'Show'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !history.params.get('filter') ? '' : 'active',
                onclick: () => history.replace({}, '', '?filter=yes')
            },
            'Hide'
        )
    ]);

export default ({ h, props }) =>
    h('ul', {}, [
        completed(props),
        position(props),
        props.adapt && dimensions(props),
        filter(props)
    ]);
