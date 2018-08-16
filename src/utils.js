import { h } from './index.js';

/**
 * @function dispatchEvent ∷ ∀ a. HTMLElement e ⇒ e → String → Object String a → void
 * ---
 * Dispatches an event, merging in the current package's version for handling legacy events
 * if/when the payloads differ from version-to-version.
 */
export const dispatchEvent = node => (name, payload) => {
    node.dispatchEvent(
        new CustomEvent(name, {
            detail: { ...payload, version: '3.0.0' },
            bubbles: true,
            composed: true
        })
    );
};

/**
 * @function getEventName ∷ String → String
 * ---
 * Prepends all event names with the '@switzerland' scope.
 */
export const getEventName = label => {
    return `@switzerland/${label}`;
};

/**
 * @function getPrototype ∷ HTMLElement e ⇒ String → e
 * ---
 * Determines which constructor to extend from for the defining of the custom element. In most cases it
 * will be `HTMLElement` unless the user is extending an existing element.
 */
export const getPrototype = extendTag => {
    return extendTag
        ? document.createElement(extendTag).constructor
        : HTMLElement;
};

/**
 * @function consoleMessage ∷ String → String → void
 * ---
 * Takes a message and an optional console type for output. During minification this function will be removed
 * from the generated output if 'NODE_ENV' is defined as 'production', as it will be unused due to 'process.env'
 * checks later on in the code.
 */
export const consoleMessage = (text, type = 'error') => {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${text}.`);
};

/**
 * @function isRemotePath ∷ String → Boolean
 * ---
 * Determines whether the passed paths are remote URLs.
 */
const isRemotePath = path =>
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('://');

/**
 * @function parseStylesheetPaths ∷ String → String
 * @see https://github.com/website-scraper/node-css-url-parser
 * ---
 * Parses all of the paths defined in the CSS and returns a unique list of the paths found.
 */
const parseStylesheetPaths = data => {
    const embeddedRegexp = /^data:(.*?),(.*?)/;
    const commentRegexp = /\/\*([\s\S]*?)\*\//g;
    const urlsRegexp = /(?:@import\s+)?url\s*\(\s*(("(.*?)")|('(.*?)')|(.*?))\s*\)|(?:@import\s+)(("(.*?)")|('(.*?)')|(.*?))[\s;]/gi;

    const isEmbedded = src => embeddedRegexp.test(src.trim());

    const getUrls = text => {
        let url;
        let urlMatch;
        const urls = [];

        text = text.replace(commentRegexp, '');

        while ((urlMatch = urlsRegexp.exec(text))) {
            url =
                urlMatch[3] ||
                urlMatch[5] ||
                urlMatch[6] ||
                urlMatch[9] ||
                urlMatch[11] ||
                urlMatch[12];

            if (url && !isEmbedded(url) && urls.indexOf(url) === -1) {
                urls.push(url);
            }
        }

        return urls;
    };

    return getUrls(data).filter(path => !isRemotePath(path));
};

/**
 * @function escapeRegExp ∷ String → String
 * @see https://github.com/sindresorhus/escape-string-regexp
 */
const escapeRegExp = value => value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

/**
 * @function getStylesheet ∷ View v ⇒ (String → String) → String → v
 * ---
 * Takes the `getPath` function which allows for resolving the paths relative to the component. Also
 * takes the path to the CSS document(s) that is fetched, its URLs parsed, and then modified to be
 * relative to the CSS document. Yields the `style` ready for appending to the VDOM tree.
 */
export const getStylesheet = getPath => async path => {
    const data = await fetch(getPath(path)).then(r => r.text());
    const urls = parseStylesheetPaths(data);
    const css = urls.length
        ? urls
              .map(url => {
                  return data.replace(
                      new RegExp(escapeRegExp(url), 'ig'),
                      getPath(url)
                  );
              })
              .join()
        : data;

    return h('style', { type: 'text/css' }, css);
};

/**
 * @function getRandomId ∷ String
 */
export const getRandomId = () => {
    const a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a.toString();
};

/**
 * @function resolveTagName ∷ String → String
 */
export const resolveTagName = name =>
    !customElements.get(name)
        ? name
        : resolveTagName(`${name}-${getRandomId()}`);
