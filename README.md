<img src="media/logo.png" alt="Switzerland" width="300" />

> Switzerland takes a functional approach to Web Components by applying middleware to your components. Supports Redux, mobx, attribute mutations, CSS variables, React-esque setState/state, etc&hellip; out-of-the-box, along with Shadow DOM for style encapsulation and Custom Elements for interoperability.

![Travis](http://img.shields.io/travis/Wildhoney/Switzerland.svg?style=for-the-badge)
&nbsp;
![npm](http://img.shields.io/npm/v/switzerland.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/Switzerland.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

`npm install switzerland --save`
<br />
`docker pull wildhoney/switzerland`

![Screenshot](media/screenshot.png)

---

## Motivation

One of the largest downsides to creating components in React, Vue, Ember, etc... is that we re-invent the wheel time-and-time again with every new framework that comes about. Although their components _may_ rely on more generic modules, we are still writing components specific to a certain framework, and typically within a certain version range &mdash; if our setup lies outside of those constraints then we need to continue our search.

For example, if somebody writes a `<mayan-calendar />` component that works nicely with Mayan dates, wouldn't it be nice if we could use that component wherever, irrespective of our chosen framework and version? If there was a `ReactMayanCalendar` that works with React `15.x` then we'd be out of luck if our setup was Ember based &mdash; or React `16.x` based.

Thankfully by utilising custom elements which are native to the browser, we can write interoperable components that can be used **anywhere** &mdash; on their own or in a framework. In addition we inherit other benefits, such as style encapsulation to prevent cross-contamination, and relative loading of CSS documents and associated images.

## Getting Started

As Switzerland is functional its components simply take `props` and yield `props` &ndash; middleware can have side-effects such as writing to the DOM. In the example below we create a component called `x-countries` that enumerates a few of the countries on planet earth:

```javascript
import { create, m } from 'switzerland';

create('x-countries', m.vdom({ h }) => (
    h('ul', {}, [
        h('li', {}, 'United Kingdom'),
        h('li', {}, 'Russian Federation'),
        h('li', {}, 'Indonesia')
    ]);
));
```

For the `x-countries` component we only have one middleware function &ndash; the `vdom` middleware which takes `props` and yields `props` but has a side-effect of writing to the DOM using [`superfine`](https://github.com/jorgebucaran/superfine)'s implementation of virtual DOM. It's worth noting that Switzerland doesn't encourage JSX as it's non-standard and unlikely to ever be integrated into the JS spec, and thus you're forced to adopt its associated toolset in perpetuity.

Nevertheless let's take the next step and supply the list of countries via HTML attributes. For this example we'll use the Switzerland types which transform HTML string attributes into a more appropriate representation &ndash; an array of strings. There's nothing special about Switzerland types &ndash; they're merely functions that transform strings into some other type, such as `Number`, `BigInt`, etc...

```javascript
import { create, m, t } from 'switzerland';

create('x-countries',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom({ attrs, h }) => (
    h('ul', {}, attrs.values.map(country => (
        h('li', {}, country)
    )));
));
```

Notice that we've now introduced the `attrs` middleware. It's the responsibility of the `attrs` middleware to parse the HTML attributes into a standard JS object, and re-render the component whenever those attributes mutate. Since the list of countries now comes from the `values` attribute, we need to add it when using the custom element:

```html
<x-countries values="United Kingdom,Russian Federation,Indonesia" />
```

By taking a reference to the `x-countries` element and mutation the `values` attribute we can force a re-render of the component with the updated list of countries:

```javascript
const node = document.querySelector('x-countries');
node.dataset.values = `${node.dataset.values},Hungary`;
```

Switzerland components only take string values as their attributes as that's all of that the HTML spec allows. Using the types we can transform those string values into JS values, and with this approach we allow for greater interoperability. Components can be used as pure HTML, using vanilla JS, React, Vue, Angular, etc... Passing complex state to components only reduces their reusability.

However it's perfectly reasonable to split up a component into multiple parts. For that we simply use regular JS functions and pass the `props` down. With this approach we stick with good old familiar regular functions, allowing us to use tried and tested libraries that work well with functions, such as [Ramda](http://ramdajs.com/). For instance, if you want to memoize a function's return, then we can use `R.once`, or piece together a series of various parts using `R.compose`. Splitting out our `x-countries` into various subparts is as easy as creating a function:

```javascript
import { create, m, t } from 'switzerland';

const countries = ({ h, attrs }) => (
    h('ul', {}, attrs.values.map(country => (
        h('li', {}, country)
    )))
);

create('x-countries-european',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom(countries)
));

create('x-countries-asian',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom(countries)
));
```

Now other components are freely able to use the `countries` function in their own components. To make it easier to pass down `props` to children, the `props` is recursively linked to itself, which means you can destructure `props` indefinitely.

Where other JS libraries fall short, Switzerland considers all web assets to be its responsibility. For example in React it is fairly common to use a non-standard, somewhat hacky JS-in-CSS solution that brings its own complexities and issues to workaround the fact that React concerns itself only with the JS view layer. With Switzerland it's easy to package up a regular CSS file alongside the component, and have the assets it references load relative to the JS document without any configuration, and no matter where it's placed on a web-server. For that we simply render a `style` node in the `vdom` middleware &ndash; or the `template` middleware if we choose to use JS template literals:

```javascript
import { create, init, m, t } from 'switzerland';

const path = init(import.meta.url);

create('x-countries',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom({ attrs, h }) => (
        h('section', {}, [
            h.stylesheet(path('index.css)),
            h('ul', {}, attrs.values.map(country => (
                h('li', {}, country)
            )));
        ])

));
```

We use the `h.stylesheet` helper function that uses `@import` to import a CSS document into the DOM. By using the `init` function we have a function that allows us to resolve assets relative to the current JS file, in this our `index.css` document that's sat alongside the component's JS file:

```css
:host {
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background-image: url('./images/world.png');
}
```

As the CSS document is imported, all assets referenced inside the CSS document are resolved relative to it. Switzerland also has a special function before a component is resolved to ensure all imported CSS files have been loaded into the DOM.
