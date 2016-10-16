import test from 'ava';
import { spy } from 'sinon';
import { pipe } from 'ramda';
import html from '../../src/middleware/html';
import { time, timeEnd } from '../../src/debug/timer';

test('Should be able to measure the time;', t => {

    const node = document.createElement('div');
    const markup = props => `<h1>${props.name}</h1>`;
    const name = 'Switzerland!';

    window.console.time = spy();
    window.console.timeEnd = spy();

    pipe(time, html(markup), timeEnd)({ node });
    t.is(window.console.time.callCount, 1);
    t.is(window.console.timeEnd.callCount, 1);

});
