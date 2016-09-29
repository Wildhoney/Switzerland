import test from 'ava';
import { spy } from 'sinon';
import performance, { performanceKey, milliseconds, measureFor, printFor } from '../../src/debug/performance';

const isProduction = process.env.NODE_ENV === 'production';

window.performance = { now: spy(() => 10000) };
window.console = { log: spy(), table: spy() };

test('Should be able to monitor performance and print the results;', t => {

    const node = document.createElement('div');
    const props = performance({ node, performance });

    const endOne = measureFor('example #1', props);
    const endTwo = measureFor('example #2', props);
    const endThree = measureFor('example #3', props);

    endOne();
    endTwo();
    endThree();
    const output = printFor(node);

    t.is(window.performance.now.callCount, isProduction ? 0 : 6);
    t.is(window.console.table.callCount, isProduction ? 0 : 1);
    t.is(window.console.log.callCount, isProduction ? 0 : 2);
    t[isProduction ? 'false' : 'true'](performanceKey in props);

    const devExpected = [
        { key: 'example #1', milliseconds: 0 },
        { key: 'example #2', milliseconds: 0 },
        { key: 'example #3', milliseconds: 0 }
    ];

    t.deepEqual(output, isProduction ? [] : devExpected);

});
