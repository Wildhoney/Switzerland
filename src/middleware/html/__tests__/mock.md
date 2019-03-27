```javascript
create(
    'x-example',
    m.html(({ name = 'Adam', h }) => h('div', {}, `Hello ${name}!`))
);
