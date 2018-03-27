import { Selector } from 'testcafe';
import yaml from 'js-yaml';
import starwars from 'starwars';

fixture `<todo-app />`.page `http://localhost:3000/`;

const todoInput = Selector(() => {
    return document.querySelector('todo-app').shadowRoot.querySelector('todo-input').shadowRoot;
});

const todoList = Selector(() => {
    return document.querySelector('todo-app').shadowRoot.querySelector('todo-list').shadowRoot;
});

test('It should be able to add todos to the list;', async t => {

    const firstTodoText = starwars();
    await t.typeText(await todoInput.find('input[type="text"]'), firstTodoText);
    await t.click(await todoInput.find('button[type="submit"]'));
    await t.expect(todoList.find('ul li:nth-of-type(1) p').textContent).eql(firstTodoText);

    const secondTodoText = starwars();
    await t.typeText(await todoInput.find('input[type="text"]'), secondTodoText);
    await t.click(await todoInput.find('button[type="submit"]'));
    await t.expect(todoList.find('ul li:nth-of-type(1) p').textContent).eql(firstTodoText);
    await t.expect(todoList.find('ul li:nth-of-type(2) p').textContent).eql(secondTodoText);

    const thirdTodoText = starwars();
    await t.typeText(await todoInput.find('input[type="text"]'), thirdTodoText);
    await t.click(await todoInput.find('button[type="submit"]'));
    await t.expect(todoList.find('ul li:nth-of-type(1) p').textContent).eql(firstTodoText);
    await t.expect(todoList.find('ul li:nth-of-type(2) p').textContent).eql(secondTodoText);
    await t.expect(todoList.find('ul li:nth-of-type(3) p').textContent).eql(thirdTodoText);

});

test('It should be able to remove todos from the list;', async t => {
    await t.expect(todoList.find('ul li').count).eql(3);
    await t.click(todoList.find('ul li:nth-of-type(3) button'));
    await t.expect(todoList.find('ul li').count).eql(2);
});

test('It should be able to mark todos from the list as done;', async t => {
    await t.expect(todoList.find('ul li:nth-of-type(1)').hasClass('done')).eql(false);
    await t.expect(todoList.find('ul li:nth-of-type(2)').hasClass('done')).eql(false);
    await t.click(todoList.find('ul li:nth-of-type(1)'));
    await t.expect(todoList.find('ul li:nth-of-type(1)').hasClass('done')).eql(true);
    await t.expect(todoList.find('ul li:nth-of-type(2)').hasClass('done')).eql(false);
});
