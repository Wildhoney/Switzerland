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
4. [Data Fetching](#data-fetching)

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

Since we use [Preact](https://preactjs.com/) to render Switzerland's components the API should already be familiar. For ease of use we re-export Preact's hook functions but you may also use them directly from Preact.

```tsx
import { create, use } from 'switzerland';

export default create('x-countries', () => {
    const [countries, setCountries] = use.state(['Japan', 'Croatia', 'Singapore']);

    return (
        <ul>
            {countries.map(country => (
                <li key={country}>{country}</li>
            ))}
        <ul>
    );
});
```

## Applying Styles

Styles within a shadow boundary allow for encapsulation which means we can use regular CSS documents scoped to our component's tree. We can attach our stylesheets to our component by using a regular `link` node, although Switzerland provides a `nodes` utility for `StyleSheet` and `Variables` &mdash; the latter applies custom variables to your component tree allowing CSS to access those JavaScript variables. We use the `use.path` hook to resolve media &mdash; CSS documents, images, etc... &mdash; relative to our component.

```tsx
import { create, use, node } from 'switzerland';

export default create('x-countries', () => {
    const path = use.path(import.meta.url);
    const [countries, setCountries] = use.state(['Japan', 'Croatia', 'Singapore']);

    return (
        <>
            <ul>
                {countries.map(country => (
                    <li key={country}>{country}</li>
                ))}
            <ul>

            <node.Variables backgroundColour={countries.length === 0 ? '#8ECCD4' : '#FBDEA3'} />

            <node.StyleSheet href={path("../../src/x-weather/styles.default.css")} />
            <node.StyleSheet href={path("../../src/x-weather/styles.mobile.css")} media="(max-width: 768px)" />
            <node.StyleSheet href={path("../../src/x-weather/styles.print.css")} media="print" />
        </>
    );
});
```

We can then be quite loose when applying those styles to our component knowing that the shadow boundary will prevent styles from leaking out &mdash; we use CSS variables to apply a conditional background colour.

```css
:host {
    box-shadow: 0 0 5px #E8C5B0;
}

ul {
    background-color: var(--background-color, '#E39AC7');
}
```

## Data Fetching

Since Switzerland allows for server-side rendering by default a `use.loader` utility hook is provided for fetching data &ndash; although you may choose to use **any** other third-party fetching utility or a simple `useEffect` and that is fine too. Using `loader` hook allows for fetching data server-side and then preventing a re-fetch on the client; we achieve this by rendering our components twice in the asynchronous `render` function we covered earlier and then including the serialised data in the tree.

```tsx
import { create, use } from 'switzerland';

export default create('x-countries', () => {
    const { data, loading, error } = use.loader('x-countries', () =>
        fetch('https://www.example.org/countries').then(response => response.json()
    ), []);

    return loading ? <p>Loading&hellip;</p> : (
        <>
            <ul>
                {countries.map(country => (
                    <li key={country}>{country}</li>
                ))}
            <ul>
        </>
    );
});
```

We provide a unique ID to the `loader` function which _should_ identify the individual request to prevent duplicates and to allow for reconciliation on the client. With the dependencies argument in third position we can re-invoke the `loader` client-side whenever a parameter changes; in our case we probably don't want to re-fetch given nothing changes but if fetching by a given list we might expect the current list of countries to be provided as dependencies.