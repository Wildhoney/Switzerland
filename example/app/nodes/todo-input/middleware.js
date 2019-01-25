import { m } from '/vendor/index.js';
import store from '../../../utils/store.js';
import index from './partials/index.js';

const createElements = ({ props }) => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    return { ...props, e: { form, input } };
};

export default [store, m.once(createElements), m.html(index)];
