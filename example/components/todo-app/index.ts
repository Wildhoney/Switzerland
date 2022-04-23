import { h, create, use } from '../../../src';

type Attrs = {
    name: string;
};

const TodoName = create<{ lang: string }>('todo-name', (attrs) => {
    return h('div', {}, `Language: ${attrs.lang}`);
});

export default create<Attrs>('todo-app', (attrs) => {
    const [user, setUser] = use.state(attrs.name);
    const [lang, setLang] = use.state('en');

    use.mount(() => {
        console.log('mounted!');
    });

    use.unmount(() => {
        console.log('unmounted!');
    });

    return h('div', {}, [
        `Hi ${user}`,
        h(TodoName, { lang }),
        h('button', { onClick: () => setUser('Adam') }, 'Change User'),
        h('button', { onClick: () => setLang('ru') }, 'Change Language'),
    ]);
});
