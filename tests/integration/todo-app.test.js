import { Selector, ClientFunction } from 'testcafe';
import yaml from 'js-yaml';
import starwars from 'starwars';
import { NAME, VERSION } from '../../example/js/todo-app/db';

fixture `TodoApp`.page `http://localhost:3000/`.beforeEach(clearStorage);

const todoInput = Selector(() => {
    return document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot;
});

const todoList = Selector(() => {
    return document.querySelector('todo-app').shadowRoot.querySelector('todo-list').shadowRoot;
});

async function addTodos(t) {

    const first = starwars();
    await t.typeText(await todoInput.find('input[type="text"]'), first);
    await t.click(await todoInput.find('button[type="submit"]'));

    const second = starwars();
    await t.typeText(await todoInput.find('input[type="text"]'), second);
    await t.click(await todoInput.find('button[type="submit"]'));

    const third = starwars();
    await t.typeText(await todoInput.find('input[type="text"]'), third);
    await t.click(await todoInput.find('button[type="submit"]'));

    return { first, second, third };
    
}

function clearStorage() {

    return new Promise(async resolve => {
        console.log('a');

        const clear = ClientFunction(() => {
            
            console.log('c');
            const open = window.indexedDB.open('database', VERSION);
    
            open.addEventListener('success', () => {
                open.result.deleteObjectStore(NAME);
                resolve();
            });

        });

        console.log('b');
        await clear();

    });
}

test('It should be able to add todos to the list;', async t => {
    const { first, second, third } = await addTodos(t);
    await t.expect(todoList.find('ul li:nth-of-type(1) p').textContent).eql(first);
    await t.expect(todoList.find('ul li:nth-of-type(2) p').textContent).eql(second);
    await t.expect(todoList.find('ul li:nth-of-type(3) p').textContent).eql(third);
});

test('It should be able to remove todos from the list;', async t => {
    await addTodos(t);
    await t.expect(todoList.find('ul li').count).eql(3);
    await t.click(todoList.find('ul li:nth-of-type(3) button'));
    await t.expect(todoList.find('ul li').count).eql(2);
});

test('It should be able to mark todos from the list as done;', async t => {
    await addTodos(t);
    await t.expect(todoList.find('ul li:nth-of-type(1)').hasClass('done')).eql(false);
    await t.expect(todoList.find('ul li:nth-of-type(2)').hasClass('done')).eql(false);
    await t.click(todoList.find('ul li:nth-of-type(1)'));
    await t.expect(todoList.find('ul li:nth-of-type(1)').hasClass('done')).eql(true);
    await t.expect(todoList.find('ul li:nth-of-type(2)').hasClass('done')).eql(false);
});
