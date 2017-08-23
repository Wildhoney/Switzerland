import test from 'ava';
import puppeteer from 'puppeteer';

test('it passes;', async t => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle' });
    // await page.pdf({path: 'hn.pdf', format: 'A4'});
    const innerText = await page.evaluate(() => document.querySelector('a[href="login?goto=news"]').innerText);

    t.is(innerText, 'login');

});
