import { h } from 'switzerland';
import { isBottom } from '../utils.js';

export default function Position({ node, attrs }) {
    return h('li', {}, [
        h('em', {}, 'Logo: '),
        h(
            'a',
            {
                class: isBottom(attrs) ? 'active' : '',
                onClick: () => node.setAttribute('logo', 'bottom'),
            },
            'Bottom'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !isBottom(attrs) ? 'active' : '',
                onClick: () => node.setAttribute('logo', 'top'),
            },
            'Top'
        ),
    ]);
}
