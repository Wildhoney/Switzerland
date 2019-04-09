export default ({ h, boundary, scores, countries }) =>
    h('header', {}, [
        h('div', { class: 'scores' }, [
            h('span', { class: 'correct' }, scores.correct),
            h('span', {}, '/'),
            h('span', { class: 'incorrect' }, scores.incorrect)
        ]),
        h('div', { class: 'country' }, countries.answer ? countries.answer.name : 'Voila...')
    ]);
