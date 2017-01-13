import { spy } from 'sinon';
import { jsdom } from 'jsdom';

export const define = spy();

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.window.MutationObserver = spy();
global.window.MutationObserver.prototype.observe = spy();
global.window.MutationObserver.prototype.disconnect = spy();

global.window.customElements = { define };
