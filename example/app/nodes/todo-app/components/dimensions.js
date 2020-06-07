import { h } from 'switzerland';

export default function Dimensions() {
    const adapt = { width: 100, height: 120 };

    return h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(adapt.width)}×${Math.round(adapt.height)}`),
    ]);
}
