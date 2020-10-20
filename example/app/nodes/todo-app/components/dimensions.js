import { h } from 'switzerland';

export default function Dimensions({ dimensions }) {
    if (!dimensions) return h('li', {}, 'Loading...');

    return h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(dimensions.width)}×${Math.round(dimensions.height)}`),
    ]);
}
