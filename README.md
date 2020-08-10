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

**npm**: `npm install switzerland`
<br />
**yarn**: `yarn add switzerland`
<br />
**cdn**: [`https://cdn.jsdelivr.net/npm/switzerland@latest/es/production/index.js`](https://cdn.jsdelivr.net/npm/switzerland@latest/es/production/index.js)

![Screenshot](media/screenshot.png)

---

## Contents

1. [Getting Started](#getting-started)
2. [Understanding Adapters](#understanding-adapters)
3. [Advanced Concepts](#advanced-concepts)
4. [Elements](#elements)
5. [Philosophy](#philosophy)

## Getting Started

Use our [JSFiddle base](https://jsfiddle.net/9kmx2tub/) (uncompiled) if you'd like to follow along interactively or for reproducing bugs for linking with issues.

Switzerland takes both a controller and a view for rendering components &ndash; the controller is used for passing props to the view, and is separate from the view as this prevents a tight coupling between the internal props required for rendering the tree. By taking this approach the controllers and views are kept more general which faciliates interoperability. In the example below we create a component called `x-countries` that enumerates a few of the countries on planet earth:

```javascript
import { create, h } from 'switzerland';

function view() {
    return h('ul', {}, [
        h('li', {}, 'United Kingdom'),
        h('li', {}, 'Russian Federation'),
        h('li', {}, 'Republic of Indonesia'),
    ]);
}

export default create('x-countries', { view });
```

We now have a usable custom element called `x-countries` which can be used anywhere. We're able to use the element even before the element is declared, as Switzerland subscribes to the [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) paradigm whereby elements are upgraded asynchronously. In the meantime you could display a loader, placeholder, static HTML generated on the server-side, or even nothing at all before the component renders.

```html
<x-countries />
```

You may have noticed for the `x-countries` component we have a view but no associated controller &ndash; instead we're using the default controller as our component doesn't yet have any specialised internal prop requirements. The view takes `props` from the controller and has a side-effect of writing to the DOM using [`morphdom`](https://github.com/patrick-steele-idem/morphdom). It's worth noting that Switzerland doesn't encourage JSX as it's non-standard and unlikely to ever be integrated into the JS spec, and thus you're forced to adopt its associated toolset in perpetuity. However there's nothing at all preventing you from introducting a build step to transform your JSX into hyperdom.

Let's take the next step and supply the list of countries via HTML attributes. For this example we'll introduce a specialised controller and use the Switzerland types which transform HTML string attributes into more appropriate representations, such as `Number`, `BigInt`, etc...

```javascript
import { create, t, h } from 'switzerland';

function controller({ adapter }) {
    const attrs = adapter.useAttrs({ values: t.Array(t.String) });

    return { countries: attrs.values };
}

function view({ countries }) {
    return h(
        'ul',
        {},
        countries.map((country) => h('li', {}, country))
    );
}

export default create('x-countries', { controller, view });
```

Notice how we're destructuring the `adapter` from the props in the controller to then parse the node's attributes. By introducing a controller it's easy to see from the example above how both the controller and view become immediately reuseable. The controller reads attributes from the node and yields the `countries` array &ndash; whereas the view simply takes the `countries` array and iterates over it. It's the responsibility of the `useAttrs` adapter to parse the HTML attributes into a standard JS object, and re-render the component whenever those attributes are mutated. Since the list of countries now comes from the `values` attribute, we need to add it when using the custom element:

```html
<x-countries values="United Kingdom,Russian Federation,Republic of Indonesia" />
```

By taking a reference to the `x-countries` element and mutating the `values` attribute we can force a re-render of the component with an updated list of countries:

```javascript
const node = document.querySelector('x-countries');
node.attributes.values = `${node.attributes.values},Hungary,Cuba`;
```

Switzerland components only take string values as their attributes as that's all the HTML spec allows. Using the types we can transform those string values into JS values, and with this approach we allow for greater interoperability. Components can be used as pure HTML, using vanilla JS, or inside React, Vue, Angular, etc... Passing complex state to components only reduces their reusability.

Where other JS libraries fall short, Switzerland considers all web assets to be within its remit. For example in React it is fairly common to use a third-party, non-standard, somewhat hacky JS-in-CSS solution that brings its own set of complexities and issues. With Switzerland it's easy to package up a regular CSS file alongside the component, and have the assets it references load relative to the JS document without any configuration. For that we simply render a `style` node in the view:

```javascript
import { create, utils, t, h } from 'switzerland';

function controller({ adapter }) {
    adapter.attachShadow();

    const path = adapter.usePath(import.meta.url);
    const attrs = adapter.useAttrs({ values: t.Array(t.String) });

    return { path, countries: attrs.values };
}

function view({ path, countries }) {
    return [
        h('section', {}, [
            h(
                'ul',
                {},
                attrs.values.map((country) => h('li', {}, country))
            ),
        ]),

        h(utils.node.Sheet, { href: path('index.css') }),
    ];
}

export default create('x-countries', { controller, view });
```

Notice that we've also invoked the `attachShadow` adapter which attaches a shadow boundary to our custom element &ndash; it also works for server-side rendering without any configuration in browsers where it's currently supported. We do this so that our applied styles are encapsulated in the component itself, rather than bleeding into other elements on the page.

We use the `utils.node.Sheet` helper function which constructs the `link` node itself &ndash; however there's no reason why we couldn't write it ourselves using the `h` function. In using the `path` middleware we have a function that allows us to resolve assets relative to the current JS file:

```css
:host {
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background-image: url('./images/world.png');
}
```

By utilising [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) you're able to keep your CSS documents as general as possible, since none of the styles defined within it will leak into other elements or components. As the CSS document is imported, all assets referenced inside the CSS document are resolved relative to it.

Adding events to a component is achieved through the `dispatch` function which is passed through the `props` to the view. In our case we'll set an event up for when a user clicks on a country name. Switzerland uses the native `CustomEvent` to handle events, and thus guaranteeing our components stay interoperable and reusable:

```javascript
import { create, utils, t, h } from 'switzerland';

function controller({ adapter }) {
    adapter.attachShadow();

    const path = adapter.usePath(import.meta.url);
    const attrs = adapter.useAttrs({ values: t.Array(t.String) });

    return { path, countries: attrs.values };
}

function view({ dispatch, path, countries }) {
    return [
        h('section', {}, [
            h(
                'ul',
                {},
                attrs.values.map((country) =>
                    h('li', { onClick: () => dispatch('clicked-country', { country }) }, country)
                )
            ),
        ]),

        h(utils.node.Sheet, { href: path('index.css') }),
    ];
}

export default create('x-countries', { controller, view });
```

Interestingly it's possible to use any valid event name for the `dispatch` as we simply need a corresponding `addEventListener` of the same name to catch it. Once we have our event all set up we can attach the listener by using the native `addEventListener` method on the custom element itself:

```javascript
const node = document.querySelector('x-countries');
node.addEventListener('clicked-country', (event) => console.log(`Country: ${event.detail.country}!`));
```

Taking the final step in our initial example &ndash; since from `v4.0.0` Switzerland has the ability to be server-side rendered without much configuration. In your Node application you need to import the `render` function which accepts a component as its argument &mdash; in return the `render` function will give you a stringified representation of your component's tree.

First we need to export the `x-countries` component so that it can be referenced from another file, and then we import that alongside the `render`, and pass the component to the `render` function.

```javascript
import fs from 'fs';
import fmt from 'string-template';
import { render } from 'switzerland';
import Countries from './components/Countries.js';

app.get('/', async (_, response) => {
    const html = fs.readFileSync('./app/index.html', 'utf-8');
    const countries = await render(Countries, {
        values: ['United Kingdom', 'Russian Federation', 'Republic of Indonesia'],
    });

    response.send(fmt(html, { countries }));
});
```

Using the declarative shadow DOM a shadow boundary will be added to your component server-side when using the `attachShadow` adapter. All styles will be applied in the component, however to prevent FOUC it's recommended to load your CSS documents in the `head` &ndash; Switzerland exports a `preload` function which takes your HTML and collates all of the CSS imports for that component tree.

```javascript
import fs from 'fs';
import fmt from 'string-template';
import { render, preload } from 'switzerland';
import Countries from './components/Countries.js';

app.get('/', async (_, response) => {
    const html = fs.readFileSync('./app/index.html', 'utf-8');
    const countries = await render(Countries, {
        values: ['United Kingdom', 'Russian Federation', 'Republic of Indonesia'],
    });

    response.send(fmt(html, { countries, styles: await preload(html) }));
});
```

The `render` function also takes an options parameter which allows you to configure how the `path` resolves the components, so that assets continue to be loaded relative on the server-side. These options are `path` which specifies the base URL for your application, and `root` which is the path to your document root.

```javascript
import path from 'path';

const options = {
    path: 'http://localhost:3000/',
    root: path.resolve('./app'),
};
```

Interestingly if you reference the `window` in any of your components, you can destructure the `window` property for server-side compatibility &ndash; on the server the `window` will be from JSDOM, whereas on the client side `window` will be the native window object.

## Understanding Adapters

Adapters are at the heart of Switzerland and whilst they may have hook-esque naming conventions, they don't have the same limitations as hooks &ndash; such as confusion over lexical scoping, not being able to be placed in conditionals, dependency lists, et cetera... Each controller automatically receives an object named `adapter` that allows for the executing of adapters. You can also write your own by invoking a function with the necessary props, such as the `render` function for re-rendering the component at any point.

-   `attachMethods`: Attach methods to a node that can be invoked once you have a reference to the node itself.
-   `attachShadow`: Attach a shadow boundary to the current node with any options passed in as the first argument.
-   `useAttrs`: Extract the attributes and parse the node's attributes according to the typings passed in. Re-render the component upon attributes mutating, and the second argument to exclude attributes from the mutation observer.
-   `useHistory`: Fetch a list of the parameters from the URL and push and replace the state. Parsed the parameters according to the passed in types as the first argument.
-   `usePath`: Yields a function when invoked with `import.meta.url` which allows you to resolve assets relative to the component's path on both the client and server.
-   `state.useMethods`: Utilises the helpful [`useMethods` from `react-use`](https://github.com/streamich/react-use/blob/master/docs/useMethods.md) which allows for reading and updating state.
-   `state.useRedux`: Utillises Redux for managing shared state between many components after creating a new store with the `utils.redux.createStore` function.
-   `observer.useResize`: Observes the dimensions of the current node and re-renders when the dimensions change.
-   `observer.useIntersection`: Observes the intersection of the current node and re-renders when the intersections change.
-   `core.useInterval`: Re-renders the component every _X_ milliseconds.
-   `run.onMount`: Utility function for running a function on mount (`lifecycle === 'mount'`);
-   `run.onUpdate`: Utility function for running a function on update (`lifecycle === 'update'`);
-   `run.onUnmount`: Utility function for running a function on unmount (`lifecycle === 'unmount'`);

## Advanced Concepts

Whilst Switzerland aspires to be as simple as possible, there are a handful of additional concepts that are more advanced which are documented in this section.

### Streaming Responses

With the exported `renderToStream` function, you're able to stream your responses to the client from the server &ndash; this allows for a quicker time to first byte response.

```javascript
import { renderToStream } from 'switzerland';
import Countries from './components/Countries.js';

app.get('/', async (_, response) => {
    response.write('<!DOCTYPE html><html lang="en"><body>');

    const reader = await renderToStream(Countries, {
        values: ['United Kingdom', 'Russian Federation', 'Republic of Indonesia'],
    });

    reader.pipe(response, { end: false });
    reader.on('end', () => response.end('</body></html>'));
});
```

It's worth remembering that when streaming responses you lose the ability to preload assets, as the full HTML is not necessarily known up-front.

### Renaming Components

In some instances it may be necessary to rename components, usually because there exists already a custom element with the name you're attempting to use. In those cases Switzerland will assign a random name to your custom element, and therefore should be renamed to something sensible using the exported `rename` function.

```javascript
import { create, rename, h } from 'switzerland';
import Country from './components/Country.js';

const CountryRenamed = rename(Country, 'x-country-renamed');

function view() {
    return h('ul', {}, [
        h(CountryRenamed, { name: 'United Kingdom' }),
        h(CountryRenamed, { name: 'Russian Federation' }),
        h(CountryRenamed, { name: 'Republic of Indonesia' }),
    ]);
}

export default create('x-countries', { view });
```

In the above case the `x-country` _may_ still exist as you'd expect, assuming it's not a duplicate, but in addition to that you'll have a custom `x-country-renamed` element that can be used in exactly the same way.

### Asynchronous Imports

In most cases importing the custom elements you're going to be using in your tree is acceptable, however you may wish to take the next step and lazy load **only** the components that are going to be used in any given render pass. For example using the example below the `Country` component is loaded asynchronously **only** when the conditions match for it to be rendered.

```javascript
import { create, fetch, h } from 'switzerland';

async function view({ showCountries }) {
    if (!showCountries) return h('div', {}, 'Countries are currently hidden.');

    return h('ul', {}, [
        h(await fetch('./components/Country.js'), { name: 'United Kingdom' }),
        h(await fetch('./components/Country.js'), { name: 'Russian Federation' }),
        h(await fetch('./components/Country.js'), { name: 'Republic of Indonesia' }),
    ]);
}

export default create('x-countries', { view });
```

Helpfully the component is fetched only once thanks to the way ECMAScript modules function. Using this approach we can prevent the unnecessary transferring of data across the wire, and in turn make it fetch lazily depending on when components are needed.

## Elements

Helpfully provided in the library are a set of custom elements that you can use in your own projects.

-   [`swiss-carousel`](src/elements/swiss-carousel)

## Philosophy

One of the largest downsides to creating components in React, Vue, Ember, etc... is that we re-invent the wheel time-and-time again with every new framework that comes about. Although their components _may_ rely on more generic modules, we are still writing components specific to a certain framework, and typically within a certain version range &mdash; if our setup lies outside of those constraints then we need to continue our search.

For example, if somebody writes a `<mayan-calendar />` component that works nicely with Mayan dates, wouldn't it be nice if we could use that component wherever, irrespective of our chosen framework and version? If there was a `ReactMayanCalendar` that works with React `15.x` then we'd be out of luck if our setup was Ember based &mdash; or React `16.x` based.

Thankfully by utilising custom elements which are native to the browser, we can write interoperable components that can be used **anywhere** &mdash; on their own or in a framework. In addition we inherit other benefits, such as style encapsulation to prevent cross-contamination, and relative loading of CSS documents and associated images.

### Plug & Play

Switzerland is capable of being integrated into any website or app without any formal installation or build process if you wish. Thanks to shadow DOM technology, all styles are also applied since Switzerland detects which host the JS originated from; if the origin and the JS host differ, then absolute paths to the domain are used when loading assets, such as CSS documents and images.

As a little teaser, navigate to [Google.com](https://www.google.com/) and paste the following snippet of code into the console:

```javascript
// Import map required for ECMA import resolutions.
const map = document.createElement('script');
map.type = 'importmap';
map.innerHTML = `{ "imports": { "switzerland": "https://cdn.jsdelivr.net/npm/switzerland@5.0.6/es/production/index.js", "morphdom": "https://cdn.jsdelivr.net/npm/morphdom@2.6.1/dist/morphdom-esm.js", "redux": "https://cdn.jsdelivr.net/npm/redux@4.0.1/es/redux.mjs", "redux-thunk": "https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js" }}`;

// Import the script for the todo app.
const node = document.createElement('script');
node.type = 'module';
node.src = 'https://switzerland.herokuapp.com/nodes/todo-app/index.js';

// Append everything to the DOM and run.
document.head.append(map);
document.head.append(node);
document.body.append(document.createElement('todo-app'));
```

After a couple of milliseconds you _should_ see the todo app embedded into Google with all of the styles applied. If you have any todos in your list then you will also see those due to the IndexedDb that the example utilises. It's worth noting that for this example to work correctly, the host &mdash; in the above case `switzerland.herokuapp.com` &mdash; needs the CORS headers configured correctly.

<!-- ## Middleware

-   `adapt` &ndash; Uses `ResizeObserver` to re-render whenever the component's dimensions change;
-   `attrs` &ndash; Provides the parsing and observing of a node's attributes.
-   [`blend`](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware/blend) &ndash; Keep your functions general when using as middleware functions.
-   `defer` &ndash; Invokes function after `x` milliseconds if the current render hasn't completed.
-   `delay` &ndash; Awaits by `x` milliseconds before continuing to the next middleware item.
-   [`wait`](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware/wait) &ndash; Await the resolution of other components to make rendering atomic. -->

<!-- ## CLI

Switzerland provides a simple CLI tool that allows you to quickly create a file and directory structure for your component. There are currently two flavours of hierarchies which you can specify by using the `style` option.

Install a version of Switzerland globally, and then use the CLI tool to create your component &ndash; in this case the `x-countries` component in the `packages` directory:

```console
foo@bar:~$ swiss packages/x-countries
```

Options supported include:

-   `--name` use a different name for the component than is specified using the directory path.
-   `--version` use a specific version of the Switzerland library.
-   `--style basic|complex` use the `complex` style over the default `basic`.
-   `--overwrite` overwrite an existing component when it already exists.
-   `--novalidate` prevent the validation of custom element names.
-   `--test-runner` use another test runner instead of the default `ava`. -->
