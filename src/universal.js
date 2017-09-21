import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';
import { basename, dirname } from 'path';
import { hostname } from 'os';
import { once } from 'ramda';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    debug: false,
    hostname: hostname(),
    protocol: 'http'
};

/**
 * @method createServer
 * @param {String} rootPath
 * @return {Number}
 */
const createServer = once(rootPath => {
    
    const app = express();
    app.options('*', cors());
    
    app.use(express.static(dirname(rootPath)));
    return app.listen().address().port;

});

/**
 * @method renderToString
 * @param {String} rootPath
 * @param {Boolean} [options = defaultOptions]
 * @return {String}
 */
export default async function renderToString(rootPath, options = defaultOptions) {

    const opts = { ...defaultOptions, ...options };
    const port = createServer(rootPath);
    const url = `${opts.protocol}://${opts.hostname}:${port}/${basename(rootPath)}`;

    const browser = await puppeteer.launch({ headless: !opts.debug });
    const page = await browser.newPage();

    await page.goto(url);

    const content = await page.evaluate(() => {

        return new Promise(async resolve => {

            setTimeout(() => {
                resolve(document.body.outerHTML);
            }, 1500);

        });

    });

    await browser.close();
    return content;

};
