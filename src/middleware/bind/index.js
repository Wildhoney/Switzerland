import { useState } from './hooks/useState.js';

/**
 * @function bind
 */
export default (fns) => {
    return async function bind(props) {
        const bind = Object.entries({ ...fns, useState }).reduce(
            (accum, [key, fn]) => ({ ...accum, [key]: fn(props) }),
            {}
        );

        return { ...props, bind };
    };
};
