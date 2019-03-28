```javascript
create(
    'x-example',
    m.intersect({ threshold: [0, 0.25, 0.5, 0.75, 1] }),
    m.html(({ intersect = { intersectionRatio: 0 }, h }) =>
        h('main', {}, `${intersect.intersectionRatio.toFixed(2)}`)
    )
);
```
