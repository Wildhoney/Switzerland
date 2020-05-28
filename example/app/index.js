import { create, m, t } from 'switzerland';

const person = create(
    'x-person',
    m.boundary(),
    m.attrs({ name: t.String }),
    m.html(({ h, attrs, server, dispatch }) => {
        return h('p', {}, [
            `${attrs.name} - `,
            h(
                'button',
                {
                    disabled: server,
                    name: attrs.name,
                    onClick: () => dispatch('person-click', attrs.name),
                },
                'Select'
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
            h('div', {}, [
                h('span', {}, `You've selected: `),
                h('strong', {}, `${name ?? 'Nobody'}!`),
                h('br'),
                h('br'),
                h('button', { disabled: !name, onClick: () => setName(null) }, 'Clear Selection'),
                h('br'),
                h('br'),
                h('hr'),
            ]),

            h(person, { name: 'Adam' }),
            h(person, { name: 'Maria' }),
            h(person, { name: 'Imogen' }),

            h.sheet(path('index.css')),
        ]);
    })
);
