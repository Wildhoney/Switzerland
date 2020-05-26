import { handlers } from '../utils.js';

export default ({ scores, countries, h, props }) => {
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
                onclick: handleReset,
            },
            'Play again?'
        ),
    ]);
};
