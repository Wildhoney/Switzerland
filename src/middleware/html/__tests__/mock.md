```javascript
create(
    'x-example',
    m.html(({ name = 'Adam', form, render, h }) => {
        return h('main', { onclick: () => render({ name: 'Adam' }) }, [
            h('div', {}, `Hello ${name}!`),
            h(
                'form',
                {
                    oncreate: form => render({ form }),
                    onsubmit: event => (
                        event.preventDefault(),
                        render({ name: form.elements.namedItem('value').value })
                    )
                },
                [
                    h('input', { type: 'text', name: 'value' }),
                    h('button', { type: 'submit' })
                ]
            )
        ]);
    })
);
```
