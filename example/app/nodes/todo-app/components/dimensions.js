import { h } from 'switzerland';

export default function Dimensions({ state }) {
    if (!state.adapt) return h('li', {}, 'Loading...');

    return h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(state.adapt.width)}×${Math.round(state.adapt.height)}`),
    ]);
}
