import { spy } from 'sinon';

export const define = spy();

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.window.MutationObserver = spy();
global.window.MutationObserver.prototype.observe = spy();
global.window.MutationObserver.prototype.disconnect = spy();

global.window.customElements = { define };
