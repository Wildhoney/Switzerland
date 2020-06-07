import { h } from 'switzerland';
import { isBottom } from '../utils.js';

export default function Position(props) {
    return h('li', {}, [
        h('em', {}, 'Logo: '),
        h(
            'a',
            {
                class: isBottom(props) ? 'active' : '',
                onClick: () => props.node.setAttribute('logo', 'bottom'),
            },
            'Bottom'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !isBottom(props) ? 'active' : '',
                onClick: () => props.node.setAttribute('logo', 'top'),
            },
            'Top'
        ),
    ]);
}
