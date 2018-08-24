import { Selector } from 'testcafe';
import starwars from 'starwars';
import R from 'ramda';

fixture`TodoApp`.page`http://localhost:3000/`;

const todoInput = Selector(() => {
    return document
        .querySelector('todo-app')
        .shadowRoot.querySelector('todo-input').shadowRoot;
});

const todoList = Selector(() => {
    return document
        .querySelector('todo-app')
        .shadowRoot.querySelector('todo-list').shadowRoot;
});

const addTodos = R.once(async t => {
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
});

test('It should be able to add todos to the list;', async t => {
    const { first, second, third } = await addTodos(t);

    await t
        .expect(todoList.find('ul li:nth-of-type(1) p').textContent)
        .eql(first);
    await t
        .expect(todoList.find('ul li:nth-of-type(2) p').textContent)
        .eql(second);
    await t
        .expect(todoList.find('ul li:nth-of-type(3) p').textContent)
        .eql(third);
});

test('It should be able to remove todos from the list;', async t => {
    const { first, second, third } = await addTodos(t);

    await t.expect(todoList.find('ul li').count).eql(3);
    await t
        .expect(todoList.find('ul li:nth-of-type(1) p').textContent)
        .eql(first);
    await t
        .expect(todoList.find('ul li:nth-of-type(2) p').textContent)
        .eql(second);
    await t
        .expect(todoList.find('ul li:nth-of-type(3) p').textContent)
        .eql(third);

    await t.click(todoList.find('ul li:nth-of-type(3) button'));

    await t.expect(todoList.find('ul li').count).eql(2);
    await t
        .expect(todoList.find('ul li:nth-of-type(1) p').textContent)
        .eql(first);
    await t
        .expect(todoList.find('ul li:nth-of-type(2) p').textContent)
        .eql(second);
});

test('It should be able to mark todos from the list as done;', async t => {
    await addTodos(t);

    await t
        .expect(todoList.find('ul li:nth-of-type(1)').hasClass('done'))
        .eql(false);
    await t
        .expect(todoList.find('ul li:nth-of-type(2)').hasClass('done'))
        .eql(false);

    await t.click(todoList.find('ul li:nth-of-type(1)'));

    await t
        .expect(todoList.find('ul li:nth-of-type(1)').hasClass('done'))
        .eql(true);
    await t
        .expect(todoList.find('ul li:nth-of-type(2)').hasClass('done'))
        .eql(false);
});
