# Blend

One of the principles of Switzerland is that all of the code you write should be portable and reusable. However let's assume you have a function that fetches data from an external source, and re-renders your component by invoking the provided `render` function from the props. Although this would work perfectly well, the `render` function is a Switzerland specific construct, and thus your function becomes **less** usable outside of the Switzerland scope.

```javascript
// Ties the function to Switzerland as it's using the `render` function...

const fetchProfile = ({ name, render, props }) => {
    fetch(`/api/profile/${name}`).then(render);
    return props;
}
```

With the `blend` middleware you are able to have a generic function that yields a `Promise`, but once the promise is resolved then the `blend` middleware will automatically invoke the `render` function for you, thus acting as a bridge between your generic function &mdash; which can now be used elsewhere as it's still general &mdash; and the Switzerland environment.

```javascript
// Instead yields the promise which blend uses to invoke `render` for you...

const fetchProfile = ({ name }) => {
    return fetch(`/api/profile/${name}`);
}
```

As you can see by comparing the two functions above, the second function becomes a lot more reusable and testable, as the Switzerland specific props have been removed (`render` and `props`) leaving only the prop that is required for the API call (`name`).
