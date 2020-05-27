import { create, m, t } from 'switzerland';

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
    m.html(({ h, render, name = null }) => {
        return h('section', { onPersonClick: (event) => render({ name: event.detail.value }) }, [
            name && h('div', {}, [h('span', {}, `You've selected:`), h('strong', {}, `${name}!`)]),

            h(person, { name: 'Adam' }),
            h(person, { name: 'Maria' }),
            h(person, { name: 'Imogen' }),

            h('button', { onClick: () => render({ name: null }) }, 'Clear'),
        ]);
    })
);
