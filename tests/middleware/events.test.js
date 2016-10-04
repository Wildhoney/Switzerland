import test from 'ava';
import events from '../../src/middleware/events';

test('Should be able to emit events;', t => {

    const node = document.createElement('div');
    t.true('event' in events({ node }));

});
