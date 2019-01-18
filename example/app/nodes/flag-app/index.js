import { create, init, m } from '/vendor/index.js';
import {
    createElements,
    fetchCountries,
    handleCountries,
    resolveImages
} from './middleware.js';

const path = init(import.meta.url);

const container = ({ countries, e, h, props }) => {
    const isComplete = countries.answered.length === countries.all.length;

    return h(e.dialog, { class: 'flag-app'}, [
        h.sheet(path('styles/index.css')),
        h.sheet(path('styles/mobile.css'), '(max-width: 768px)'),
        h('section', { class: 'body' }, [
            header(props),
            isComplete && congratulations(props),
            !isComplete && flags(props)
        ])
    ]);
};

const header = ({ h, scores, countries, e }) =>
    h('header', {}, [
        h('div', { class: 'scores' }, [
            h('span', { class: 'correct' }, scores.correct),
            h('span', {}, '/'),
            h('span', { class: 'incorrect' }, scores.incorrect)
        ]),
        h(
            'div',
            { class: 'country' },
            countries.answer ? countries.answer.name : 'Voila...'
        ),
        h(
            'a',
            {
                class: 'close',
                onclick: () => e.dialog.close()
            },
            String.fromCharCode(215)
        )
    ]);

const flags = ({ countries, render, loader, h, props }) =>
    h(
        'div',
        { class: 'flags' },
        h(
            'ul',
            {},
            countries.selection.map((country, index) =>
                h('li', {}, [
                    h('img', {
                        class: 'flag',
                        src: loader[index],
                        onclick: () => {
                            const key =
                                country === countries.answer
                                    ? 'correct'
                                    : 'incorrect';
                            render({
                                ...props,
                                countries: {
                                    ...countries,
                                    answered: [
                                        ...countries.answered,
                                        countries.answer.name
                                    ]
                                },
                                scores: {
                                    ...props.scores,
                                    [key]: props.scores[key] + 1
                                }
                            });
                        }
                    })
                ])
            )
        )
    );

const congratulations = ({ scores, countries, h, render, props }) =>
    h('div', { class: 'congrats' }, [
        h(
            'p',
            {},
            `Congratulations! You've scored ${scores.correct} out of ${
                countries.all.length
            }.${String.fromCharCode(160)}`
        ),
        h(
            'a',
            {
                onclick: () =>
                    render({
                        scores: { correct: 0, incorrect: 0 },
                        countries: { ...props.countries, answered: [] }
                    })
            },
            'Play again?'
        )
    ]);

export default create(
    'flag-app',
    m.once(({ props }) => ({ ...props, scores: { correct: 0, incorrect: 0 } })),
    m.once(fetchCountries),
    m.once(createElements),
    handleCountries,
    resolveImages,
    m.vdom(container)
);
