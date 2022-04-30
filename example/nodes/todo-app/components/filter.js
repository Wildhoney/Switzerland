import { h } from 'switzerland';

export default function Filter({ history }) {
    return h('li', {}, [
        h('em', {}, 'Complete: '),
        h(
            'a',
            {
                class: history.params.get('filter') ? '' : 'active',
                onClick: () => history.replaceState({}, '', '?filter=no'),
            },
            'Show'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !history.params.get('filter') ? '' : 'active',
                onClick: () => history.replaceState({}, '', '?filter=yes'),
            },
            'Hide'
        ),
    ]);
}
