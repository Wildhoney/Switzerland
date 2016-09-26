import test from 'ava';
import attributes from '../../src/middleware/attributes';

test('Should be able to parse attributes;', t => {

    const node = document.createElement('div');
    node.setAttribute('name', 'Adam');
    node.setAttribute('data-age', '30');
    node.setAttribute('data-birth-date', 'Oct 10');
    node.setAttribute('LOCATION', 'London');

    t.deepEqual(attributes({ node }), {
        node,
        attrs: {
            name: 'Adam',
            age: '30',
            birthDate: 'Oct 10',
            location: 'London'
        }
    });

});
