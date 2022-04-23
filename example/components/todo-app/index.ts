import { h, create, use, types } from '../../../src';

type Attrs = {
    name: string;
    age: string;
};

const TodoName = create<{ lang: string }>('todo-name', (attrs) => {
    return h('div', {}, `Language: ${attrs.lang}`);
});

export default create<Attrs>('todo-app', (attrs) => {
    const transformedAttrs = use.attrs({ name: types.String, age: types.Int });

    const [user, setUser] = use.state(attrs.name);
    const [age, setAge] = use.state(transformedAttrs.age);
    const [lang, setLang] = use.state('en');

    return h('div', {}, [
        `Hi ${user}: `,
        `You are ${age} years old`,
        h('button', { onClick: () => setAge(age - 1) }, '-'),
        h('button', { onClick: () => setAge(age + 1) }, '+'),
        h(TodoName, { lang }),
        h('button', { onClick: () => setUser('Adam') }, 'Change User'),
        h('button', { onClick: () => setLang('ru') }, 'Change Language'),
    ]);
});
