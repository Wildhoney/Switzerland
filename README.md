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
import { create } from 'switzerland';

export default create('x-countries', ({ attrs }) => {
    const countries = attrs.list.split(',');

    return (
        <ul>
            {countries.map(country => (
                <li key={country}>{country}</li>
            ))}
        <ul>
    );
});
```

Using our component from within a Node environment requires us to use the exported asynchronous `render` function; we can specify an optional second parameter to the function, however as our component is currently super simple it's unnecessary at the moment.

```tsx
app.get("/", async (_, response) => {
    const html = render(<Countries list="Japan,Croatia,Singapore" />);
    response.send(html);
});
```

As our components are self-contained modules, any changes to their attributes will initiate a re-render of the component's tree.

```js
const node = document.querySelector('x-countries');
node.attributes.values = `${node.attributes.values},Ukraine,Maldives`;
```
