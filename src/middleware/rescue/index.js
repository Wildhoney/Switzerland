import html from '../html/index.js';

export const rescueHandler = Symbol('switzerland/rescue');

/**
 * @function rescue
 * ---
 * Takes a list of middleware which includes one or more 'html' middleware items, and renders into the component
 * whenever an exception is raised in the processing of the middleware. If the 'rescue' middleware has not been
 * defined on the component, then a console error will be rendered instead, but only in development mode.
 */
export default (getTree) => {
    return function rescue(props) {
        return {
            ...props,
            html: getTree,
            [rescueHandler]: (props) => {
                return html(getTree)(props);
            },
        };
    };
};
