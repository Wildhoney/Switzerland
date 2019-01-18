import { m } from '/vendor/index.js';
import * as u from './utils.js';

export const createElements = ({ props }) => {
    const dialog = document.createElement('dialog');
    document.addEventListener('@flag-app/init', () => dialog.showModal());
    return { ...props, e: { dialog } };
};

export const fetchCountries = async ({ props }) => ({
    ...props,
    countries: {
        all: await fetch('/countries.json').then(response => response.json()),
        selection: [],
        answer: null,
        answered: []
    }
});

export const handleCountries = ({ countries, props }) => {
    const shuffled = u.shuffle(countries.all);
    const answer = shuffled.find(
        ({ name }) => !countries.answered.includes(name)
    );
    const candidates = answer
        ? shuffled.filter(country => country !== answer)
        : [];
    const selection = answer
        ? u.shuffle([...candidates.splice(0, 3), answer])
        : [];

    return {
        ...props,
        countries: { ...countries, selection, answer }
    };
};

export const resolveImages = async ({ countries, props }) => {
    const flags = countries.selection.map(
        ({ flag }) => `/images/flags/${flag}`
    );
    return (await m.loader({ ...flags }))(props);
};
