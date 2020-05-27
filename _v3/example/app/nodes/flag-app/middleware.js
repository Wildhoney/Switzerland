import { m } from 'switzerland';
import * as u from './utils.js';

const fetchCountries = async ({ props }) => ({
    ...props,
    countries: {
        all: await fetch('/countries.json').then((response) => response.json()),
        selection: [],
        answer: null,
        answered: [],
    },
});

const handleCountries = ({ countries, props }) => {
    const shuffled = u.shuffle(countries.all);
    const answer = shuffled.find(({ name }) => !countries.answered.includes(name));
    const candidates = answer ? shuffled.filter((country) => country !== answer) : [];
    const selection = answer ? u.shuffle([...candidates.splice(0, 3), answer]) : [];

    return {
        ...props,
        countries: { ...countries, selection, answer },
    };
};

const resolveImages = async ({ countries, props }) => {
    const flags = countries.selection.map(({ flag }) => `/images/flags/${flag}`);
    return (await m.loader({ ...flags }))(props);
};

export default (tree) => [
    m.boundary(),
    m.once(({ props }) => ({ ...props, scores: { correct: 0, incorrect: 0 } })),
    m.once(fetchCountries),
    handleCountries,
    resolveImages,
    m.html(tree),
    m.methods({
        open: ({ boundary }) => boundary.querySelector('dialog').showModal(),
    }),
];