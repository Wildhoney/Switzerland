export default ({ loader, h }) =>
    h('h1', {}, [
        h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
            h('img', { src: loader.logo })
        ])
    ]);
