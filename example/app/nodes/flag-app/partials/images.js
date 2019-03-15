// import { u } from '/vendor/index.js';
// import { handlers } from '../utils.js';

export default ({ countries, loader, h, props }) => {
    // const handleAnswer = handlers.answer(props);

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
                        src: loader[index]
                        // onclick: u.once(handleAnswer(country))
                    })
                ])
            )
        )
    );
};
