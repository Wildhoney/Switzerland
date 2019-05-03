import test from "ava";import {render} from "../index.js"
import { create,m } from '../../index.js';

const shallow = create('x-shallow', m.html(({h}) => h('div', {}, 'Hello Adam!')));

test("It should be able to render a shallow component to string;", async t =>{
    t.is(await render(shallow), '<x-shallow class="resolved"><div>Hello Adam!</div></x-shallow>')
})
