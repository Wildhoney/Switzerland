import { create, init, m, u } from '/vendor/index.js';
import {
    createElements,
    fetchCountries,
    handleCountries,
    resolveImages
} from './middleware.js';
import { handlers } from './utils.js';

const path = init(import.meta.url);

const container = ({ countries, e, h, props }) => {
    const isComplete = countries.answered.length === countries.all.length;

    return h(e.dialog, { class: 'flag-app' }, [
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

const flags = ({ countries, loader, h, props }) => {
    const handleAnswer = handlers.answer(props);

    return h(
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
                        onclick: u.once(handleAnswer(country))
                    })
                ])
            )
        )
    );
};

const congratulations = ({ scores, countries, h, props }) => {
    const handleReset = handlers.reset(props);

    return h('div', { class: 'congrats' }, [
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
                onclick: handleReset
            },
            'Play again?'
        )
    ]);
};

export default create(
    'flag-app',
    m.once(({ props }) => ({ ...props, scores: { correct: 0, incorrect: 0 } })),
    m.once(fetchCountries),
    m.once(createElements),
    handleCountries,
    resolveImages,
    m.vdom(container)
);
