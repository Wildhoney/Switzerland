import { VNode, h, use } from 'switzerland';

import { Props as RootProps } from '../types';

type Props = {
    is: RootProps['logo'];
};

export default function Position({ is }: Props): VNode {
    const env = use.env();
    const handlePositionToggle = use.callback(
        () => env.node?.setAttribute('logo', env.node?.getAttribute('logo') === 'bottom' ? 'top' : 'bottom'),
        [env.node]
    );

    return (
        <li>
            <em>Logo:</em>{' '}
            <a class={is === 'bottom' && 'active'} onClick={handlePositionToggle}>
                Bottom
            </a>{' '}
            <span>/</span>{' '}
            <a class={is === 'top' && 'active'} onClick={handlePositionToggle}>
                Top
            </a>
        </li>
    );
}
