import { spy } from 'sinon';

export const define = spy();

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

/**
 * @constant customElements
 * @type {Object}
 */
global.window.customElements = {
    define
};
