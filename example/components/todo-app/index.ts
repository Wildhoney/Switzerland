import { h, create, use, types } from '../../../src';

type Attrs = {
    name: string;
    age: string;
};

export default create<Attrs>('todo-app', () => {
    const attrs = use.attrs<Attrs>({ age: types.Int });
    const path = use.path(import.meta.url);
    console.log(path('test.png'));

    const [user, setUser] = use.state(attrs.name);
    const [age, setAge] = use.state(attrs.age);

    return h('div', {}, [
        `Hi ${user}: `,
        `You are ${age} years old`,
        h('button', { onClick: () => setAge(age - 1) }, '-'),
        h('button', { onClick: () => setAge(age + 1) }, '+'),
        h('button', { onClick: () => setUser('Adam') }, 'Change User'),
    ]);
});
