export const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const shuffle = values => {
    const a = [...values];

    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};

const handleAnswer = ({ countries, render, props }) => country => () => {
    const key = country === countries.answer ? 'correct' : 'incorrect';
    render({
        ...props,
        countries: {
            ...countries,
            answered: [...countries.answered, countries.answer.name]
        },
        scores: {
            ...props.scores,
            [key]: props.scores[key] + 1
        }
    });
};

const handleReset = ({ render, props }) => () =>
    render({
        scores: { correct: 0, incorrect: 0 },
        countries: { ...props.countries, answered: [] }
    });

export const handlers = { answer: handleAnswer, reset: handleReset };
