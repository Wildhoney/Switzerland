import { create } from '@switzerland/core';
import html from '@switzerland/vdom';
import attrs from '@switzerland/attrs';
import rescue from '@switzerland/rescue';
import styles from './index.css';

create(
    'x-welcome',
    attrs(),
    rescue(
        html(props => {
            return (
                <section>
                    <h1>An error: {props.error.message}</h1>
                    <button onclick={props.render}>Attempt Retry</button>
                </section>
            );
        })
    ),
    props => {
        if (Math.random() > 0.5) {
            throw new Error('Oh noooo!');
        }
        return props;
    },
    html(async props => {
        console.log(props);

        return (
            <section>
                <style type="text/css">{styles.toString()}</style>
                <h1>Hello {props.attrs.name}!</h1>
                <time>Date/Time: {Date.now()}</time>
                <br />
                <br />
                <button onclick={props.render}>Reload Component...</button>
            </section>
        );
    })
);
