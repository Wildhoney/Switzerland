import * as impl from './impl/index.js';
import * as utils from './utils.js';

export function create(name, ...middleware) {
    const [tag, constuctor, extend] = utils.parseTagName(name);

    window.customElements.define(
        tag,
        impl.base(constuctor, middleware),
        extend && { extends: extend }
    );

    return impl.server(extend ?? tag, middleware, extend ? tag : null);
}
