```javascript
create(
    'x-example',
    m.history({ name: [t.String, 'Adam'], age: [t.Int, 33] }),
    m.html(({ history, h }) =>
        h('main', {}, [
            h(
                'div',
                {},
                `Hola ${history.params.get('name')}! You are ${
                    history.params.get('age') > 30 ? 'old' : 'young'
                }.`
            ),
            h(
                'a',
                { onclick: () => history.push({}, '', '?name=Maria&age=28') },
                'Click!'
            )
        ])
    )
);
```
