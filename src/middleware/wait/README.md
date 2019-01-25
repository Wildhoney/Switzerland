# Wait

Suppose you have a parent component with child components nested within it, where both of the child components fetch their own required data. Due to the encapsulation of components, it's not possible by default to defer the displaying of the `profile-card` component before the `user-name` and `user-location` components have finished their rendering process.

```html
<profile-card>
    <user-name />
    <user-location />
</profile-card>
```

By using the `wait` middleware you can instruct the `profile-card` component to await the loading of the two child components before being considered *resolved* itself &mdash; which is when the `resolved` class name is appended to the `profile-card` node and the promise yielded from the `render` function has been resolved.

```javascript
create(
    'profile-card',
    m.html(() => h('div', {}, [
        h('user-name'),
        h('user-location')
    ])),
    m.wait('user-name', 'user-location')
);
```

It's important the `wait` middleware appears after the middleware function that appends the nodes to the DOM, otherwise the `wait` middleware will not behave as expected. When `wait` cannot find the defined nodes in the DOM, they're simply ignored which allows you to happily supply nodes that appear conditionally.

```javascript
create(
    'profile-card',
    m.html(({ showName }) => h('div', {}, [
        showName && h('user-name'),
        h('user-location')
    ])),
    m.wait('user-name', 'user-location')
);
```

Once you've setup the middleware, the `resolved` class name will **only** be appended to the `profile-card` once the async `user-name` and `user-location` components have successfully finished their own render cycle. Once they've rendered, you can make the `profile-card` component appear gracefully using CSS, in the safe knowledge that the entire component will be loaded atomically, rather than having two loading spinners for the two child nodes that resolve at different times.
