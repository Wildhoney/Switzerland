export default ({ loader, h }) =>
    h('h1', { part: 'header' }, [
        h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
            h('img', { src: loader.logo })
        ])
    ]);
