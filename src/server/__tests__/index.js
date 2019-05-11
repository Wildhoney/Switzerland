import test from 'ava';
import axios from 'axios';
import capitalise from 'capitalize';
import { create, init, m, t as type } from '../../index.js';
import { render } from '../index.js';

test.serial('It should be able to render a shallow component to string;', async t => {
    const component = create('x-example', m.html(({ h }) => h('div', {}, 'Hello Adam!')));
    t.snapshot(await render(component));
});

test.serial(
    'It should be able to render a shallow component to string by passing pure HTML;',
    async t => {
        create('x-example', m.html(({ h }) => h('div', {}, 'Hello Adam!')));
        t.snapshot(await render('<div><x-example name="Adam"></x-example></div>'));
    }
);

test.serial(
    'It should be able to render a shallow component with a HTTP request to string;',
    async t => {
        const fetch = async props => {
            const { data } = await axios.get('https://randomuser.me/api/?seed=24541ccf67bc0aa2');
            return { ...props, name: capitalise(data.results[0].name.first) };
        };
        const component = create(
            'x-example',
            fetch,
            m.html(({ name, h }) => h('div', {}, `Hello ${name}!`))
        );
        t.snapshot(await render(component));
    }
);

test.serial('It should be able to render a shallow component with styles to string;', async t => {
    const url = 'https://www.example.org?name=Adam';
    const path = init(import.meta.url, {
        url,
        rootPath: resolve => resolve('./')
    });

    const component = create(
        'x-example',
        m.window(url),
        m.html(({ h }) =>
            h('section', {}, [
                h('div', {}, 'Hello Adam!'),
                h('img', { src: path('../images/profile.png'), alt: 'Profile' }),
                h.sheet(path('styles/index.css'))
            ])
        )
    );
    t.snapshot(await render(component));
});

test.serial(
    'It should be able to render a shallow component with attributes to string;',
    async t => {
        const component = create(
            'x-example',
            m.attrs({ name: type.String, age: [type.Int, null] }),
            m.html(({ attrs, h }) =>
                attrs.age === null
                    ? h('div', {}, `Hello ${attrs.name} we don't know old you are next!`)
                    : h('div', {}, `Hello ${attrs.name} you are ${attrs.age + 1} next!`)
            )
        );
        t.snapshot(await render(component, { name: 'Adam' }));
        t.snapshot(await render(component, { name: 'Maria', age: 28 }));
    }
);

test.serial(
    'It should be able to render a shallow component with URL params to string;',
    async t => {
        const component = create(
            'x-example',
            m.window('https://www.example.org?name=Adam'),
            m.history({ name: type.String }),
            m.html(({ history, h }) => h('div', {}, `Hello ${history.params.get('name')}!`))
        );
        t.snapshot(await render(component));
    }
);

test.serial('It should be able to render a nested component to string;', async t => {
    const child = create('x-child', m.html(({ h }) => h('div', {}, 'Adam')));
    const parent = create(
        'x-parent',
        m.html(({ h }) => h('div', {}, [h('span', {}, 'Hello'), h(child), h('span', {}, '!')]))
    );
    t.snapshot(await render(parent));
});

test.serial(
    'It should be able to render a nested component with attributes to string;',
    async t => {
        const child = create(
            'x-child',
            m.attrs({ name: type.String }),
            m.html(({ attrs, h }) => h('div', {}, attrs.name))
        );
        const parent = create(
            'x-parent',
            m.attrs({ name: [type.String, 'Adam'] }),
            m.html(({ attrs, h }) =>
                h('div', {}, [
                    h('span', {}, 'Hello'),
                    h(child, { name: attrs.name }),
                    h('span', {}, '!')
                ])
            )
        );
        t.snapshot(await render(parent));
        t.snapshot(await render(parent, { name: 'Maria' }));
    }
);
