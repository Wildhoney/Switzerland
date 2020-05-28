import { create, m, t } from 'switzerland';

const button = create(
    'x-button/div',
    m.window(import.meta.url),
    m.boundary(),
    m.attrs({ name: t.String }),
    m.html(({ path, h, children }) => {
        return h('div', {}, [children, h.styleSheet(path('button.css'))]);
    })
);

const person = create(
    'x-person',
    m.boundary(),
    m.attrs({ name: t.String }),
    m.html(({ h, attrs, server, dispatch }) => {
        return h('p', {}, [
            `${attrs.name} - `,
            h(
                button,
                {
                    disabled: server,
                    name: attrs.name,
                    onClick: () => dispatch('person-click', attrs.name),
                },
                'Choose'
            ),
        ]);
    })
);

export default create(
    'x-people',
    m.window(import.meta.url),
    m.boundary(),
    m.html(({ path, h, f }) => {
        const [name, setName] = f.useState(null);

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
