<img src="media/logo.png" alt="Switzerland" width="300" />

> Switzerland takes a functional approach to web components using Preact with shadow DOM for style encapsulation, custom elements for interoperability and server-side rendering for universality.

![npm](http://img.shields.io/npm/v/switzerland.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

**yarn**: `yarn add switzerland`
<br />
**npm**: `npm install switzerland`
<br />
<!-- **cdn**: [`https://cdn.jsdelivr.net/npm/switzerland@latest/es/index.js`](https://cdn.jsdelivr.net/npm/switzerland@latest/es/index.js) -->

![Screenshot](media/screenshot.png)

---

## Contents

1. [Getting Started](#getting-started)
2. [Managing State](#managing-state)
3. [Applying Styles](#applying-styles)

## Getting Started

Switzerland optionally begins with server-side rendering with hydration on the client thanks to [declarative shadow DOM](https://developer.chrome.com/en/articles/declarative-shadow-dom/) &mdash; with our components looking very familiar due to our usage of [Preact](https://preactjs.com/).

```tsx
import { create } from 'switzerland';

export default create('x-countries', () => {
    return (
        <ul>
            <li>Japan</li>
            <li>Croatia</li>
            <li>Singapore</li>
        <ul>
    );
});
```

Once we've defined our `x-countries` component we are able to both render it on the server and hydrate it on the client as a standard `<x-countries />` DOM element. We can then take a step further and allow our countries to be passed as a HTML attribute on the DOM node using `<x-countries list="Japan,Croatia,Singapore">`.

```tsx
import { create, use, type } from 'switzerland';

export default create('x-countries', () => {
    const attrs = use.attrs({
        countries: type.Array(type.String)
    });

    return (
        <ul>
            {attrs.countries.map(country => (
                <li key={country}>{country}</li>
            ))}
        <ul>
    );
});
```

Using our component from within a Node environment requires us to use the exported asynchronous `render` function; we can specify an optional second parameter to the function, however our component currently doesn't perform data fetching or media inclusion and so is unnecessary.

```tsx
import { render } from 'switzerland';

app.get("/", async (_, response) => {
    const html = await render(<Countries list="Japan,Croatia,Singapore" />);
    response.send(html);
});
```

As our components are self-contained modules, any changes to their attributes will initiate a re-render of the component's tree &ndash; regardless of whether those attributes change from inside another component or through vanilla DOM accessors.

```js
const node = document.querySelector('x-countries');
node.attributes.values = `${node.attributes.values},Ukraine,Maldives`;
```

## Managing State

Since we use [Preact](https://preactjs.com/) to render Switzerland's components, the API is very similar to React. For ease of use we re-export Preact's hook functions but you can also directly use them from the Preact package if you choose.

```tsx
import { create, use } from 'switzerland';

export default create('x-countries', () => {
    const [countries, setCountries] = use.state(['Japan', 'Croatia', 'Singapore']);

    return (
        <ul>
            {attrs.countries.map(country => (
                <li key={country}>{country}</li>
            ))}
        <ul>
    );
});
```

## Applying Styles

As we're using web components to allow for style encapsulation, applying styles is more akin to how the web expects us to apply styles via vanilla CSS with class names, etc... With the shadow boundary defined on each component, styles don't bleed into other components or into other HTML elements in the DOM. StyleSheet documents are attached using the traditional `link` element but we also export a convenient `node` component for attaching stylesheets and defining custom CSS properties. We must use the `path` hook with `import.meta.url` to resolve our stylesheets relative to our component &mdash; interestingly we use the same hook for all kinds of media, such as images.

```tsx
import { create, use, nodes } from 'switzerland';

export default create('x-countries', () => {
    const [countries, setCountries] = use.state(['Japan', 'Croatia', 'Singapore']);

    return (
        <>
            <ul>
                {attrs.countries.map(country => (
                    <li key={country}>{country}</li>
                ))}
            <ul>

            <node.StyleSheet href={path("../../src/x-weather/styles.default.css")} />
            <node.StyleSheet href={path("../../src/x-weather/styles.mobile.css")} media="(max-width: 768px)" />
            <node.StyleSheet href={path("../../src/x-weather/styles.print.css")} media="print" />
        </>
    );
});
```

Custom variables allow us to pass JavaScript variables into the stylesheet &ndash; by default they're attached to the `:host` node (in our case above, `x-countries`) but you can pass the `container` to define a child node to attach them to.

```tsx
import { create, use, nodes } from 'switzerland';

export default create('x-countries', () => {
    const [countries, setCountries] = use.state(['Japan', 'Croatia', 'Singapore']);

    return (
        <>
            <ul>
                {attrs.countries.map(country => (
                    <li key={country}>{country}</li>
                ))}
            <ul>

            <node.Variables backgroundColour={countries.length === 0 ? 'red' : 'green'} />
            <node.StyleSheet href={path("../../src/x-weather/styles.css")} />
        </>
    );
});
```

From within our `styles.css` stylesheet we can then reference the `var(--background-colour)` that is attached to our `x-countries` node and applying some additional styles.

```css
:host {
    box-shadow: 0 0 5px lightgrey;
    border: 2px solid blue;
}

ul {
    background-color: var(--background-color);
}
```
