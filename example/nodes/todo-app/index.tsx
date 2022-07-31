import { VNode, create, h, node, type, use } from 'switzerland';

import TodoInput from '../todo-input';
import TodoList from '../todo-list';
import Dimensions from './components/Dimensions';
import Position from './components/Position';
import { Props } from './types';

export default create<Props>('todo-app', (): VNode => {
    const path = use.path(import.meta.url);
    const attrs = use.attrs({ logo: type.String });

    const isBottom = attrs['logo'] === 'bottom';
    // const history = use.history({ filter: [type.Bool, false] });

    return (
        <>
            <section class="todo-app">
                <TodoInput />
                <TodoList />

                <h1>
                    <a href="https://github.com/Wildhoney/Switzerland">
                        <img src={path('./images/logo.png')} />
                    </a>
                </h1>

                <ul>
                    <Dimensions />
                    <Position is={attrs['logo'] as 'bottom' | 'top'} />
                </ul>
            </section>

            <node.StyleSheet href={path('./styles/index.css')} />
            <node.StyleSheet href={path('./styles/mobile.css')} media="(max-width: 768px)" />
            <node.StyleSheet href={path('./styles/print.css')} media="print" />

            <node.Variables
                orderPosition={isBottom ? 1 : -1}
                borderColour={isBottom ? 'transparent' : 'rgba(0, 0, 0, 0.1)'}
            />
        </>
    );
});
