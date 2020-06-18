import { h } from 'switzerland';

export default function Dimensions({ adapt }) {
    if (!adapt) return h('li', {}, 'Loading...');

    return h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(adapt.width)}×${Math.round(adapt.height)}`),
    ]);
}
