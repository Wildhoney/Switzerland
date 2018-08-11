import { create } from '@switzerland/core';
import html from '@switzerland/vdom';
import styles from './index.css';

create(
    'x-timedate',
    html(props => {
        return (
            <section>
                <style type="text/css">{styles}</style>
                <h1>Hello Switzerland!</h1>
                <time>Time: {Date.now()}</time>
                <br />
                <br />
                <button onclick={props.render}>Reload Component...</button>
            </section>
        );
    })
);
