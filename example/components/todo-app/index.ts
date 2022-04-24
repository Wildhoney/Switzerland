import { h, create, use, types } from '../../../src';

class Attrs {
    name = types.String;
    age = types.Int;
}

const TodoName = create<{ lang: string }>('todo-name', (attrs) => {
    const dispatch = use.dispatch();

    return h('div', { onClick: () => dispatch('langclick', 'Clicked lang!') }, `Language: ${attrs.lang}`);
});

export default create<Attrs>('todo-app', (attrs) => {
    const transformedAttrs = use.attrs(new Attrs());
    console.log(transformedAttrs);

    const [user, setUser] = use.state(attrs.name);
    const [age, setAge] = use.state(transformedAttrs.age);
    const [lang, setLang] = use.state('en');

    return h('div', { onlangclick: console.log }, [
        `Hi ${user}: `,
        `You are ${age} years old`,
        h('button', { onClick: () => setAge(age - 1) }, '-'),
        h('button', { onClick: () => setAge(age + 1) }, '+'),
        h(TodoName, { lang }),
        h('button', { onClick: () => setUser('Adam') }, 'Change User'),
        h('button', { onClick: () => setLang('ru') }, 'Change Language'),
    ]);
});
