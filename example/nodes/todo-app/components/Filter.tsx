import { VNode, h, use } from 'switzerland';

type Props = {
    history: any;
};

export default function Filter({ history }: Props): VNode {
    const handleShow = use.callback((): void => {
        history.replaceState({}, '', '?filter=no');
    }, [history]);

    const handleHide = use.callback((): void => {
        history.replaceState({}, '', '?filter=yes');
    }, [history]);

    return (
        <li>
            <em>Complete:</em>{' '}
            <a class={history.params.get('filter') ? '' : 'active'} onClick={handleShow}>
                Show
            </a>
            <span> / </span>
            <a class={!history.params.get('filter') ? '' : 'active'} onClick={handleHide}>
                Hide
            </a>
        </li>
    );
}
