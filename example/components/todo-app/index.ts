import { h, create, use } from '../../../src';

type Attrs = {
    name: string;
};

export default create<Attrs>('todo-app', (attrs) => {
    const env = use.env();

    return h('div', {}, `Hi ${attrs.name}. You are currently viewing ${env.path}.`);
});
