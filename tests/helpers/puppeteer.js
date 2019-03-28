import path from 'path';
import fs from 'fs';
import express from 'express';
import marked from 'marked';
import puppeteer from 'puppeteer';
import * as R from 'ramda';

const read = R.curry(async (page, port, path) => {
    const ast = marked.lexer(fs.readFileSync(path, 'utf-8'));
    const snippets = await Promise.all(
        ast.filter(entry => Boolean(entry.lang)).map(R.prop('text'))
    );

    await Promise.all(
        snippets.map(async snippet => {
            const content = `
            import { create, m } from 'http://localhost:${port}/src/index.js';
            ${snippet}
        `;
            await page.addScriptTag({
                type: 'module',
                content
            });
        })
    );
});

const load = R.curry(async (page, name) => {
    await page.evaluate(async name => {
        const node = document.createElement(name);
        document.body.appendChild(node);
    }, name);

    await page.waitForFunction(`Boolean(customElements.get('${name}'))`);

    const html = await page.evaluate(async name => {
        const node = document.createElement(name);
        await node.render();
        return node.innerHTML;
    }, name);

    return html;
});

export default async (t, run) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setBypassCSP(true);

    const app = express();
    app.use(express.static(path.resolve('./')));
    const port = await new Promise(resolve => {
        const listener = app.listen(async () => {
            const port = listener.address().port;
            await page.goto(`http://localhost:${port}`);
            resolve(port);
        });
    });

    try {
        await run({ t, page, read: read(page, port), load: load(page) });
    } finally {
        await page.close();
        await browser.close();
    }
};
