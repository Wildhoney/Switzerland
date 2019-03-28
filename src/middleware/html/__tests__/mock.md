```javascript
create(
    'x-example',
    m.html(({ name = 'Adam', render, h }) =>
        h('div', { onclick: () => render({ name: 'Adam' }) }, `Hello ${name}!`)
    )
);
```
