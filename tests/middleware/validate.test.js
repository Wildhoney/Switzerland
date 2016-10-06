import test from 'ava';
import PropTypes from 'prop-types';
import { spy } from 'sinon';
import validate from '../../src/middleware/validate';

test('Should be able to validate props;', t => {

    const node = document.createElement('my-component');

    const model = { name: 'Adam', age: '30' };
    const schema = {
        model: PropTypes.shape({
            name: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired
        }).isRequired
    };

    console.warn = spy();
    const props = validate(schema)({ node, model });

    t.is(console.warn.callCount, 1);
    t.true(console.warn.calledWith('Warning: Failed propType: Invalid prop `age` of type `string` supplied to `my-component`, expected `number`.'));
    t.deepEqual(props, {
        node,
        model: {
            name: 'Adam',
            age: '30'
        }
    });

});
