import { h } from 'switzerland';

export default function Nothing({ server }) {
    return [
        h('li', { class: 'none' }, [
            h('p', {}, server ? `Please wait for your todos to be fetched...` : 'You have not added any todos yet.'),
        ]),
    ];
}
