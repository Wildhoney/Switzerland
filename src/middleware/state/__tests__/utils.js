import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import * as u from '../utils.js';

test('It should be able to set the `useState` function and behave as expected;', t => {
    const boundUseState = u.useState(defaultProps);

    function run(expectedName, expectedAge) {
        // There's no denying that hooks are weird, because by default each invocation will return
        // a different object, and there's no good way of keep track of state between renders. Instead
        // the `useState` is tracked by its position in the file using a try-catch. Hence why we have
        // this test written in a function that invokes itself. Also hence why hooks should NEVER be wrapped
        // in conditionals.
        //
        // I don't recommend this as a way forward (nor do I agree with React's implementation
        // on the same basis), because it's magical behaviour, and goes against how programming languages
        // generally operate, making it hard to reason about for others.
        //
        // Nevertheless...

        const [name, setName] = boundUseState('Adam');
        const [age, setAge] = boundUseState(33);
        const [location, setLocation] = boundUseState('Watford, UK');

        t.is(name, expectedName);
        t.is(age, expectedAge);
        t.is(location, 'Watford, UK');

        t.is(typeof setName, 'function');
        t.is(typeof setAge, 'function');
        t.is(typeof setLocation, 'function');

        if (expectedName !== 'Maria') {
            setName('Maria');
            setAge(27);
            run('Maria', 27);
        }
    }

    run('Adam', 33);
});
