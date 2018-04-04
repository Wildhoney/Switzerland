import { create, h } from './switzerland';
import * as m from './middleware';
import PropTypes from 'prop-types';

create('swiss-dialog', m.attrs(), m.include(props => props.attrs.stylesheet), m.html(props => {

    return (
        <dialog class="swiss-dialog">
            <section class="dialog">
                <header>
                    {props.attrs.title}
                    <a className="close" onclick={() => props.dispatch('close')}>
                        &times;
                    </a>
                </header>
                <section class="body">
                    <slot />
                </section>
            </section>
        </dialog>
    );

}), props => {
    const dialog = props.boundary.querySelector('dialog');
    props.attrs.open ? dialog.showModal() : dialog.close();
});
