import { create, init, m, t } from 'switzerland';

const path = init(import.meta.url);

const person = create(
    'x-person',
    m.boundary(),
    m.attrs({ name: t.String }),
    m.html(({ h, attrs, dispatch }) => {
        return h('p', { onClick: () => dispatch('person-click', attrs.name) }, [
            `${attrs.name} - `,
            h('a', { href: 'javscript:void' }, 'Choose'),
        ]);
    })
);

export default create(
    'x-people',
    m.boundary(),
    m.state({ name: 'Adam' }),
    m.html(({ state, h }) => {
        const [name, setName] = state(null);

        return h('section', { onPersonClick: (event) => setName(event.detail.value) }, [
            h.styleSheet(path('index.css')),

            name &&
                h('div', {}, [h('span', {}, `You've selected:`), ' ', h('strong', {}, `${name}!`)]),

            h(person, { name: 'Adam' }),
            h(person, { name: 'Maria' }),
            h(person, { name: 'Imogen' }),

            h('button', { disabled: !name, onClick: () => setName(null) }, 'Clear'),
        ]);
    })
);