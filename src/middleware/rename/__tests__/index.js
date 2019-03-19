import test from "ava";
import defaultProps from '../../../../tests/helpers/default-props.js';
import rename from "../index.js";

    test("It should be able to simply yield the props if no new props;",async t=>{
        const m = rename('none', props => props);
        const newProps = await m(defaultProps);
        t.deepEqual(newProps, defaultProps);
    })

    test("It should be able to rename the props when only one item is added;",async t=>{
        const m = rename('single', props => ({ ...props, one: true }));
        const newProps = await m(defaultProps);
        t.deepEqual(newProps, {...defaultProps, "single": true});
    })

test("It should be able to rename the props when only multiple items are added;",async t=>{
    const m = rename('multiple', props => ({ ...props, one: true, two: true, three: true }));
    const newProps = await m(defaultProps);
    t.deepEqual(newProps, {...defaultProps, "multiple": {one: true, two: true, three: true}});
})
