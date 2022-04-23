import { h, create, use } from '../../../src';

type Attrs = {
    name: string;
};

export default create<Attrs>('todo-app', (attrs) => {
    const [user, setUser] = use.state(attrs.name);

    use.mount(() => {
        console.log('mounted!');
    });

    use.unmount(() => {
        console.log('unmounted!');
    });

    return h('div', {}, [`Hi ${user}`, h('button', { onClick: () => setUser('Adam') }, 'Switch User')]);
});
