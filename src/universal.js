import { basename, dirname } from 'path';
import { hostname } from 'os';
import puppeteer from 'puppeteer';
import express from 'express';
import { once } from 'ramda';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    debug: false,
    hostname: hostname(),
    protocol: 'http',
    persistent: true
};

/**
 * @method createServer :: string -> number
 * @param {String} rootPath
 * @return {Number}
 *
 * Creates the Express server once and once only, with a random port being assigned that the function yields.
 */
const createServer = once(rootPath => {
    const app = express();
    app.use(express.static(dirname(rootPath)));
    return app.listen(0).address().port;
});

/**
 * @method openBrowser
 * @param {Object} opts
 * @return {Object}
 */
const openBrowser = once(opts => {
    return puppeteer.launch({ headless: !opts.debug });
});

/**
 * @method elementsDidResolve :: object -> Promise
 * @param {Object} page
 * @return {Promise}
 *
 * Filters out elements that are controlled by Switzerland, and waits them to be resolved. Puppeteer invokes the
 * passed function continuously until it yields a truthy value.
 */
function elementsDidResolve(page) {

    return page.waitFor(() => {

        return Array.from(document.querySelectorAll('*')).filter(node => node.isSwitzerland).every(node => {
            node.setAttribute('data-switzerland', '');
            return node.classList.contains('resolved');
        });

    });

}

/**
 * @method renderToString :: string -> object -> Promise
 * @param {String} rootPath
 * @param {Boolean} [options = defaultOptions]
 * @return {String}
 *
 * Takes the path to the HTML document and any options and gives back a string representation of the DOM
 * with all styles inlined, and `slot` elements removed.
 */
export default async function renderToString(rootPath, options = defaultOptions) {

    const opts = { ...defaultOptions, ...options };
    const port = createServer(rootPath);
    const url = `${opts.protocol}://${opts.hostname}:${port}/${basename(rootPath)}`;

    const browser = await openBrowser(opts);
    const page = await browser.newPage();

    await page.setUserAgent('Switzerland');
    await page.goto(url);
    await elementsDidResolve(page);

    const content = await page.content();
    await page.close();
    return content;

};
