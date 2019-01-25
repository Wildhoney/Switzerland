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

**npm**: `npm install switzerland --save`
<br />
**dkr**: `docker pull wildhoney/switzerland`
<br />
**cdn**: [`https://cdn.jsdelivr.net/npm/switzerland@latest/es/production/index.js`](https://cdn.jsdelivr.net/npm/switzerland@latest/es/production/index.js)

## Contents

1. [Getting Started](#getting-started)
2. [Motivation](#motivation)
3. [Plug & Play](#plug--play)
4. [Middleware](#middleware)
5. [CLI](#cli)

![Screenshot](media/screenshot.png)

---

## Getting Started

As Switzerland is functional its components simply take `props` and yield `props` &ndash; middleware can have side-effects such as writing to the DOM, and can also be asynchronous by yielding a `Promise`. Middleware is processed on each render from left-to-right which makes components very easy to reason about. In the example below we create a component called `x-countries` that enumerates a few of the countries on planet earth:

```javascript
import { create, m } from 'switzerland';

create('x-countries', m.vdom(({ h }) =>
    h('ul', {}, [
        h('li', {}, 'United Kingdom'),
        h('li', {}, 'Russian Federation'),
        h('li', {}, 'Republic of Indonesia')
    ])
));
```

We now have a usable custom element called `x-countries` which can be used anywhere. We're able to use the element even before the element is declared, as Switzerland subscribes to the [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) paradigm whereby elements are upgraded asynchronously. In the meantime you could display a loader, placeholder or even nothing at all before the component renders.

```html
<x-countries />
```

For the `x-countries` component we only have one middleware function &ndash; the `vdom` middleware which takes `props` and yields `props` but has a side-effect of writing to the DOM using [`superfine`](https://github.com/jorgebucaran/superfine)'s implementation of virtual DOM. It's worth noting that Switzerland doesn't encourage JSX as it's non-standard and unlikely to ever be integrated into the JS spec, and thus you're forced to adopt its associated toolset in perpetuity. However there's nothing at all preventing you from introducting a build step to transform your JSX into hyperdom.

Let's take the next step and supply the list of countries via HTML attributes. For this example we'll use the Switzerland types which transform HTML string attributes into more appropriate representations, such as `Number`, `BigInt`, etc...

```javascript
import { create, m, t } from 'switzerland';

create(
    'x-countries',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom(({ attrs, h }) =>
        h('ul', {}, attrs.values.map(country => h('li', {}, country)))
    )
);
```

Notice that we've now introduced the `attrs` middleware before the `vdom` middleware; we have a guarantee that `attrs` has completed its work before passing the baton to `vdom`. It's the responsibility of the `attrs` middleware to parse the HTML attributes into a standard JS object, and re-render the component whenever those attributes are mutated. Since the list of countries now comes from the `values` attribute, we need to add it when using the custom element:

```html
<x-countries values="United Kingdom,Russian Federation,Republic of Indonesia" />
```

By taking a reference to the `x-countries` element and mutating the `values` attribute we can force a re-render of the component with an updated list of countries:

```javascript
const node = document.querySelector('x-countries');
node.attributes.values = `${node.attributes.values},Hungary,Cuba`;
```

Switzerland components only take string values as their attributes as that's all the HTML spec allows. Using the types we can transform those string values into JS values, and with this approach we allow for greater interoperability. Components can be used as pure HTML, using vanilla JS, or inside React, Vue, Angular, etc... Passing complex state to components only reduces their reusability.

Where other JS libraries fall short, Switzerland considers all web assets to be within its remit. For example in React it is fairly common to use a third-party, non-standard, somewhat hacky JS-in-CSS solution that brings its own set of complexities and issues. With Switzerland it's easy to package up a regular CSS file alongside the component, and have the assets it references load relative to the JS document without any configuration. For that we simply render a `style` node in the `vdom` middleware &ndash; or the `template` middleware if we choose to use JS template literals:

```javascript
import { create, init, m, t } from 'switzerland';

const path = init(import.meta.url);

create(
    'x-countries',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom(({ attrs, h }) =>
        h('section', {}, [
            h.sheet(path('index.css')),
            h('ul', {}, attrs.values.map(country => h('li', {}, country)))
        ])
    )
);
```

We use the `h.sheet` helper function that uses `@import` to import a CSS document into the DOM, which also specifies a static `key` based on the path to prevent the CSS from being constantly downloaded on re-render. In using the `init` function we have a function that allows us to resolve assets relative to the current JS file:

```css
:host {
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background-image: url('./images/world.png');
}
```

By utilising [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) you're able to keep your CSS documents as general as possible, since none of the styles defined within it will leak into other elements or components. As the CSS document is imported, all assets referenced inside the CSS document are resolved relative to it. Switzerland also has a special function before a component is resolved to ensure all imported CSS files have been loaded into the DOM.

Adding events to a component is achieved through the `dispatch` function which is passed through the `props`. In our case we'll set an event up for when a user clicks on a country name. Switzerland uses the native `CustomEvent` to handle events, and thus guaranteeing our components stay interoperable and reusable:

```javascript
import { create, init, m, t } from 'switzerland';

const path = init(import.meta.url);

create(
    'x-countries',
    m.attrs({ values: t.Array(t.String) }),
    m.vdom(({ attrs, dispatch, h }) =>
        h('section', {}, [
            h.sheet(path('index.css')),
            h('ul', {}, attrs.values.map(country => (
                h('li', {
                    onclick: () => dispatch('clicked-country', { country })
                }, country)
            )))
        ])
    )
);
```

Interestingly it's possible to use any valid event name for the `dispatch` as we simply need a corresponding `addEventListener` of the same name to catch it. Once we have our event all set up we can attach the listener by using the native `addEventListener` method on the custom element itself:

```javascript
const node = document.querySelector('x-countries');
node.addEventListener('clicked-country', event => (
    console.log(`Country: ${event.detail.country}!`)
));
```

## Motivation

One of the largest downsides to creating components in React, Vue, Ember, etc... is that we re-invent the wheel time-and-time again with every new framework that comes about. Although their components _may_ rely on more generic modules, we are still writing components specific to a certain framework, and typically within a certain version range &mdash; if our setup lies outside of those constraints then we need to continue our search.

For example, if somebody writes a `<mayan-calendar />` component that works nicely with Mayan dates, wouldn't it be nice if we could use that component wherever, irrespective of our chosen framework and version? If there was a `ReactMayanCalendar` that works with React `15.x` then we'd be out of luck if our setup was Ember based &mdash; or React `16.x` based.

Thankfully by utilising custom elements which are native to the browser, we can write interoperable components that can be used **anywhere** &mdash; on their own or in a framework. In addition we inherit other benefits, such as style encapsulation to prevent cross-contamination, and relative loading of CSS documents and associated images.

## Plug & Play

Switzerland is capable of being integrated into any website or app without any formal installation or build process if you wish. Thanks to shadow DOM technology, all styles are also applied since Switzerland detects which host the JS originated from; if the origin and the JS host differ, then absolute paths to the domain are used when loading assets, such as CSS documents and images.

As a little teaser, navigate to [Google.com](https://www.google.com/) and paste the following snippet of code into the console:

```javascript
const node = document.createElement('script');
node.type = 'module';
node.src = 'https://switzerland.herokuapp.com/nodes/todo-app/index.js';
document.head.append(node);
document.body.append(document.createElement('todo-app'));
```

After a couple of milliseconds you *should* see the todo app embedded into Google with all of the styles applied. If you have any todos in your list then you will also see those due to the IndexedDb that the example utilises. It's worth noting that for this example to work correctly, the host &mdash; in the above case `switzerland.herokuapp.com` &mdash; needs the CORS headers configured correctly.

## Middleware

* `adapt` &ndash; Uses `ResizeObserver` to re-render whenever the component's dimensions change; 
* `attrs` &ndash; Provides the parsing and observing of a node's attributes.
* [`blend`](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware/blend) &ndash; Keep your functions general when using as middleware functions.
* `defer` &ndash; Invokes function after `x` milliseconds if the current render hasn't completed.
* `delay` &ndash; Awaits by `x` milliseconds before continuing to the next middleware item.
* [`wait`](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware/wait) &ndash; Await the resolution of other components to make rendering atmoic.

## CLI

Switzerland provides a simple CLI tool that allows you to quickly create a directory structure for your component. Along with `images`, `styles` and `tests` which are fairly self-explanatory, the CLI also sets up a `middleware` directory that exports an array of middleware functions, both standard ones from the Switzerland library itself, and also custom ones which can either be separate files in the `middleware` directory, or listed individually in the `index.js` based on developer choice. Likewise the CLI tool also creates a `partials` directory that should be used for exporting sub-trees of your component's DOM, allowing you to easily test each segment individually.

Install a version of Switzerland globally, and then use the CLI tool to create your component &ndash; in this case the `x-countries` component in the `packages` directory:

```console
foo@bar:~$ swiss packages/x-countries
```

Options supported include:

* `--name` use a different name for the component than is specified using the directory path.
* `--version` use a specific version of the Switzerland library.
* `--overwrite` overwrite an existing component when it already exists.
* `--test-runner` use another test runner instead of the default `ava`.
