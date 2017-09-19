import puppeteer from 'puppeteer';

/**
 * @method renderToString
 * @param {String} markup
 * @return {String}
 */
export default async function renderToString(markup) {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const content = await page.setContent(markup);
    page.mainFrame().addScriptTag('http://localhost:3000/js/welcome-card/build.js');

    return page.evaluate(() => {

        return new Promise(resolve => {

            setTimeout(() => {
                resolve(document.body.outerHTML);
            }, 2000);

        });

    });

};
