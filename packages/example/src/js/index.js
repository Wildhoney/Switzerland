import { create } from '@switzerland/core';
import html from '@switzerland/vdom';
import attrs from '@switzerland/attrs';
import rescue from '@switzerland/rescue';
import styles from './index.css';

const error = rescue(
    html(props => {
        return (
            <section>
                <h1>Error: {props.error.message}</h1>
                <button onclick={props.render}>Attempt Retry</button>
            </section>
        );
    })
);

const thrower = props => {
    // if (Math.random() > 0.25) {
    //     throw new Error('Oh noooo!');
    // }
    return props;
};

create(
    'x-welcome',
    attrs(),
    error,
    thrower,
    html(props => (
        <section>
            <style type="text/css">{styles.toString()}</style>
            <h1>Hello {props.attrs.name}!</h1>
            <time>Date/Time: {Date.now()}</time>
            <_todo-input />
            <button onclick={props.render}>Reload Component...</button>
        </section>
    ))
);
