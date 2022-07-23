import { VNode, h, node } from 'switzerland';

type Props = {
    history?: any;
    actions: any;
    list: any[];
};

export default function List({ history, actions, list }: Props): VNode {
    // const todos = list
    //     .filter((model) => (history.params.get('filter') ? !model.done : true))
    //     .sort((a, b) => a.created - b.created);

    return list.length === 0 ? (
        <li>
            <p>You are filtering out all completed todos.</p>
        </li>
    ) : (
        <>
            {list.map((model) => (
                <li class={model.done ? 'done' : ''}>
                    <p onClick={(): void => actions.mark(model.id)}>{model.text}</p>

                    <button class="delete" onClick={(): void => actions.remove(model.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </>
    );
}
