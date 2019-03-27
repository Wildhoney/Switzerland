import puppeteer from 'puppeteer';
import * as R from 'ramda';

const append = R.curry(async (page, name) => {
    await page.waitForFunction(`Boolean(customElements.get('${name}'))`);

    return page.evaluate(async name => {
        const node = document.createElement(name);
        document.body.appendChild(node);
        await node.render();
        return node.innerHTML;
    }, name);
});

export default async function withPage(t, run) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await run({ t, page, append: append(page) });
    } finally {
        await page.close();
        await browser.close();
    }
}
