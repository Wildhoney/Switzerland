import { h, VNode } from 'switzerland';

export default function Nothing(): VNode {
    return (
        <li class="none">
            <p>You have not added any todos yet.</p>
        </li>
    );
}
