import test from 'ava';
import sinon from 'sinon';
import { getWindow, consoleMessage, replaceTemplate, checkFormValidity } from '../utils.js';

test('It should be able to resolve the window object depending on its existence;', async (t) => {
    const window = global.window;
    delete global.window;

    t.is(typeof (await getWindow()), 'object');
    t.not(await getWindow(), window);

    global.window = window;
    t.is(await getWindow(), window);
});

test('It should be able to log out a message in a given type', (t) => {
    sinon.stub(console, 'log');
    sinon.stub(console, 'error');
    sinon.stub(console, 'warn');

    consoleMessage('Hi Adam', 'log');
    t.is(console.log.callCount, 1);

    consoleMessage('Hi Maria', 'warn');
    t.is(console.warn.callCount, 1);

    consoleMessage('Hi Imogen', 'error');
    t.is(console.error.callCount, 1);

    console.log.restore();
    console.error.restore();
    console.warn.restore();
});

test('It should be able to replace the template string with the actual template node name;', (t) => {
    t.snapshot(
        replaceTemplate(`
            <swiss-template>Hi Adam</swiss-template>
            <swiss-template>Hi Maria</swiss-template>
            <swiss-template>Hi Imogen</swiss-template>`)
    );
});

test('It should be able to check the form validity and the invalid fields;', (t) => {
    const form = document.createElement('form');
    t.snapshot(checkFormValidity(form));

    const invalidInput = document.createElement('input');
    invalidInput.name = 'invalid';
    invalidInput.required = true;

    const invalidInputWithoutName = document.createElement('input');
    invalidInputWithoutName.required = true;

    const validInput = document.createElement('input');
    validInput.name = 'valid';
    validInput.required = true;
    validInput.value = 'Imogen!';

    form.append(invalidInput);
    form.append(invalidInputWithoutName);

    t.snapshot(checkFormValidity(form));
});
