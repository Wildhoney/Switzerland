import { create, m, t } from 'switzerland';

const person = create(
    'x-person',
    m.boundary(),
    m.attrs({ name: t.String }),
    m.html(({ h, server, attrs, dispatch }) => {
        return h('p', { onClick: () => dispatch('person-click', attrs.name) }, [
            `${attrs.name} - `,
            h('button', { disabled: server }, 'Choose'),
        ]);
    })
);

export default create(
    'x-people',
    m.window(import.meta.url),
    m.boundary(),
    m.state({ name: 'Adam' }),
    m.html(({ state, path, h, window }) => {
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
