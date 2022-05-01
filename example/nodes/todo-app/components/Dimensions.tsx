import { h, node } from 'switzerland';
import { useResize } from '../utils';

export default function Dimensions() {
    const dimensions = useResize();

    return (
        <li>
            <em>Dimensions:</em>{' '}
            <span>
                {!dimensions ? (
                    <>Loading&hellip;</>
                ) : (
                    `${Math.round(dimensions.width)}×
            ${Math.round(dimensions.height)}`
                )}
            </span>
        </li>
    );
}
