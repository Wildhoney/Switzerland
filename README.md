<img src="media/logo.png" alt="Switzerland" width="300" />

> Switzerland takes a functional approach to Web Components by applying middleware to your components. Supports Redux, attribute mutations, CSS variables, React-esque setState/state, etc&hellip; out-of-the-box, along with Shadow DOM for style encapsulation and Custom Elements for interoperability.

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
**cdn**: [`https://cdn.jsdelivr.net/npm/switzerland@latest/es/index.js`](https://cdn.jsdelivr.net/npm/switzerland@latest/es/index.js)

![Screenshot](media/screenshot.png)

---

## Contents

1. [Getting Started](#getting-started)
2. [Understanding Adapters](#understanding-adapters)
3. [Custom Adapters](#custom-adapters)
4. [Advanced Concepts](#advanced-concepts)
5. [Elements](#elements)
6. [Philosophy](#philosophy)

## Getting Started

Use our [JSFiddle base](https://jsfiddle.net/go67hy2z/) (uncompiled) if you'd like to follow along interactively or for reproducing bugs for linking with issues.

Switzerland takes both a name and a view for rendering components &ndash; the name must following the naming conventions for custom elements, and the view is a function that yields a DOM structure. In the example below we create a component called `x-countries` that enumerates a few of the countries on planet earth:

```javascript
import { create, h } from 'switzerland';

export default create('x-countries', () => {
    return h('ul', {}, [
        h('li', {}, 'United Kingdom'),
        h('li', {}, 'Russian Federation'),
        h('li', {}, 'Republic of Indonesia'),
    ]);
});
```

We now have a usable custom element called `x-countries` which can be used anywhere. We're able to use the element even before the element is declared, as Switzerland subscribes to the [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) paradigm whereby elements are upgraded asynchronously. In the meantime you could display a loader, placeholder, static HTML generated on the server-side, or even nothing at all before the component renders.

```html
<x-countries />
```

The view yields a DOM structure and has a side-effect of writing to the DOM using [`morphdom`](https://github.com/patrick-steele-idem/morphdom). It's worth noting that Switzerland doesn't encourage JSX as it's non-standard and unlikely to ever be integrated into the JS spec, and thus you're forced to adopt its associated toolset in perpetuity. However there's nothing at all preventing you from introducting a build step to transform your JSX into hyperdom.

Let's take the next step and supply the list of countries via HTML attributes. For this example we'll desturcture the `use` object and use the Switzerland types which transform HTML string attributes into more appropriate representations, such as `Number`, `BigInt`, etc...

```javascript
import { create, type, h } from 'switzerland';

export default create('x-countries', ({ use }) => {
    const attrs = use.attributes({ values: type.Array(type.String) });
    const countries = attrs.values;

    return h(
        'ul',
        {},
        countries.map((country) => h('li', {}, country))
    );
});
```

Notice how we're destructuring the `use` from the props in the view to then parse the node's attributes. The `use.attributes` reads attributes from the node and yields the `countries` array and then simply takes the `countries` array and iterates over it. It's the responsibility of the `use.attributes` adapter to parse the HTML attributes into a standard JS object, and re-render the component whenever those attributes are mutated. Since the list of countries now comes from the `values` attribute, we need to add it when using the custom element:

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
import { create, utils, type, h } from 'switzerland';

export default create('x-countries', ({ use }) => {
    use.shadow();

    const attrs = use.attributes({ values: type.Array(type.String) });
    const countries = attrs.values;
    const path = use.path(import.meta.url);

    return [
        h(
            'ul',
            {},
            countries.map((country) => h('li', {}, country))
        ),
        h(utils.node.Sheet, { href: path('index.css') }),
    ];
});
```

Notice that we've also invoked the `use.shadow` adapter which attaches a shadow boundary to our custom element &ndash; it also works for server-side rendering without any configuration in browsers where it's currently supported. We do this so that our applied styles are encapsulated in the component itself, rather than bleeding into other elements on the page.

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
import { create, utils, type, h } from 'switzerland';

export default create('x-countries', ({ use, dispatch }) => {
    use.shadow();

    const attrs = use.attributes({ values: type.Array(type.String) });
    const countries = attrs.values;
    const path = use.path(import.meta.url);

    return [
        h(
            'ul',
            {},
            countries.map((country) => h('li', { onClick: () => dispatch('clicked-country', { country }) }, country))
        ),
        h(utils.node.Sheet, { href: path('index.css') }),
    ];
});
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

Using the declarative shadow DOM a shadow boundary will be added to your component server-side when using the `use.shadow` adapter. All styles will be applied in the component, however to prevent FOUC it's recommended to load your CSS documents in the `head` &ndash; Switzerland exports a `preload` function which takes an array of your components and collates all of the CSS imports for those component trees.

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

    response.send(fmt(html, { countries, styles: await preload(countries) }));
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

Instead of passing in a root component to begin the server-side rendering process, it's also possible to use the exported `render` function to pass in a chunk of HTML and a list of custom components. The DOM tree will be walked and nodes replaced with custom components where applicable.

```javascript
import fs from 'fs';
import fmt from 'string-template';
import { render } from 'switzerland';
import Countries from './components/Countries.js';

const map = new Map([['x-countries', Countries]]);

app.get('/', async (_, response) => {
    const html = fs.readFileSync('./app/index.html', 'utf-8');
    const countries = await render('<x-countries></x-countries>', map);

    response.send(fmt(html, { countries }));
});
```

Options are again passed in as the third argument when necessary. And the HTML may contain as many nodes and Swiss components as you wish as long as there's an appropriate mapping &mdash; this allows the server to behave similar to how the browser cherry-picks the custom elements from the DOM tree to render in isolation.

## Understanding Adapters

Adapters are at the heart of Switzerland and whilst they may have hook-esque naming conventions, they don't have the same limitations as hooks &ndash; such as confusion over lexical scoping, not being able to be placed in conditionals, dependency lists, et cetera... Each view automatically receives an object named `use` that allows for the executing of adapters. You can also write your own by invoking a function with the necessary props, such as the `render` function for re-rendering the component at any point.

### `use.methods`

Attach methods to a node that can be invoked once you have a reference to the node itself.

```javascript
function view({ node, use }) {
    use.methods({ greet: (name) => `${node.nodeName.toLowerCase()} meet ${name}.` });
    // ...
}
```

### `use.shadow`

Attach a shadow boundary to the current node with any options passed in as the first argument.

```javascript
function view({ use }) {
    const root = use.shadow({ delegatesFocus: true });
    // ...
}
```

### `use.attributes`

Extract the attributes and parse the node's attributes according to the typings passed in. Re-render the component upon attributes mutating, and the second argument to exclude attributes from the mutation observer.

```javascript
import { type } from 'switerland';

function view({ use }) {
    const { name, age } = use.attributes({ name: type.String, age: type.Int });
    // ...
}
```

### `use.form`

Re-renders the component passing in any forms that have been parsed after rendering the component. Yields a map of the form name to the form element. If any of your forms don't have a name, then it will come through as `default` &mdash; thus multiple forms **must** have names.

```javascript
function view({ use }) {
    const form = use.form();
    // ...
}
```

### `use.history`

Fetch a list of the parameters from the URL and push and replace the state. Parsed the parameters according to the passed in types as the first argument.

```javascript
import { type } from 'switerland';

function view({ use }) {
    const { params, pushState, replaceState } = use.history({ name: type.String, age: type.Int });
    const person = { name: params.get('name'), age: params.get('age') };
    // ...
}
```

### `use.path`

Yields a function when invoked with `import.meta.url` which allows you to resolve assets relative to the component's path on both the client and server.

```javascript
function view({ use }) {
    const path = use.path(import.meta.url);
    // ...
}
```

### `use.state`

Utilises either a simple store similar to React's `useState` or if passed a Redux store then a more complex state that is able to be shared between different components.

Pass a non-store object to opt-in to the simple state management that is similar to React's `useState`.

```javascript
function view({ use }) {
    const [name, setName] = use.state('Imogen');
    // ...
}
```

Alternatively pass in a Redux store instance created via `createStore` to use Redux.

```javascript
import { store } from './store.js';

function view({ use }) {
    const [state, dispatch] = use.state(store);
    // ...
}
```

You may also pass in an `actionCreators` object which will automatically invoke `bindActionCreators` for you and yield those bound functions rather than the `dispatch` function.

```javascript
import { store, actionCreators } from './store.js';

function view({ use }) {
    const [state, actions] = use.state(store, { actionCreators });
    // ...
}
```

### `use.on.mount`, `use.on.update`, `use.on.unmount`, `use.on.rendered`

Set of convenient utility functions for running functions on mount, update, unmount and post-rendering.

```javascript
import { t, utils } from 'switerland';

function view({ node, use }) {
    const name = node.nodeName.toLowerCase();

    use.on.mount(() => console.log(`${name} mounted.`));
    use.on.update(() => console.log(`${name} updated.`));
    use.on.unmount(() => console.log(`${name} unmounted.`));
    use.on.rendered(() => console.log(`${name} rendered.`));

    // ...
}
```

## Custom Adapters

Switzerland only ships with a handful of core adapters to keep the library as terse as possible. You can use the destructured `use` as a function. It will be invoked with all of the props so you have access to `render`, `node`, et cetera... For example attaching a function that re-renders every X milliseconds to create a time component could be implemented as a custom adapter which you can then share amongst other components.

```javascript
import { create, h } from 'switzerland';

function interval(ms) {
    return ({ lifecycle, render, state }) => {
        switch (lifecycle) {
            case 'mount':
                return { interval: setInterval(render, ms) };

            case 'unmount':
                clearInterval(state.interval);
                return {};
        }
    };
}

export default create('x-timestamp', ({ use }) => {
    use(interval(1_000));

    return h('time', {}, Date.now());
});
```

Notice that We're using the special `state` object that is passed into custom attributes which is a shared state for each node. It allows you to prevent mutating variables inside your adapters to store state, rather yielding a state object that can then be destructured again for later use.

## Advanced Concepts

Whilst Switzerland aspires to be as simple as possible, there are a handful of additional concepts that are more advanced which are documented in this section.

### Streaming Responses

With the exported `render` function, you're able to stream your responses to the client from the server with the `stream: true` option set &ndash; this allows for a quicker time to first byte response.

```javascript
import { render } from 'switzerland';
import Countries from './components/Countries.js';

app.get('/', async (_, response) => {
    response.write('<!DOCTYPE html><html lang="en"><body>');

    const reader = await render(
        Countries,
        {
            values: ['United Kingdom', 'Russian Federation', 'Republic of Indonesia'],
        },
        { stream: true }
    );

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

export default create('x-countries', () => {
    return h('ul', {}, [
        h(CountryRenamed, { name: 'United Kingdom' }),
        h(CountryRenamed, { name: 'Russian Federation' }),
        h(CountryRenamed, { name: 'Republic of Indonesia' }),
    ]);
});
```

In the above case the `x-country` _may_ still exist as you'd expect, assuming it's not a duplicate, but in addition to that you'll have a custom `x-country-renamed` element that can be used in exactly the same way.

### Asynchronous Imports

In most cases importing the custom elements you're going to be using in your tree is acceptable, however you may wish to take the next step and lazy load **only** the components that are going to be used in any given render pass. For example using the example below the `Country` component is loaded asynchronously **only** when the conditions match for it to be rendered.

```javascript
import { create, fetch, h } from 'switzerland';


export default create('x-countries', ({showCountries}) => {
    if (!showCountries) return h('div', {}, 'Countries are currently hidden.');

    return h('ul', {}, [
        h(await fetch('./components/Country.js'), { name: 'United Kingdom' }),
        h(await fetch('./components/Country.js'), { name: 'Russian Federation' }),
        h(await fetch('./components/Country.js'), { name: 'Republic of Indonesia' }),
    ]);
});
```

Helpfully the component is fetched only once thanks to the way ECMAScript modules function. Using this approach we can prevent the unnecessary transferring of data across the wire, and in turn make it fetch lazily depending on when components are needed.

### Handling Forms

In your view you can use the `use.form` function which yields an object map of forms in your component's tree &ndash; if your form doesn't have a name then it will be named `default` in the map, otherwise it will use the form's name. On mount `form` will be an empty object, but if one or more forms are detected then all subsequent renders will contain form references &ndash; that way you can handle events such as when the form is invalid to have the submit button disabled.

```javascript
import { create, fetch, h } from 'switzerland';

export default create('x-form', ({ use }) => {
    const form = use.form();

    return [
        h('form', { onSubmit: handleSubmit }, [
            h('input', {
                value: state.text,
                onInput: (event) => methods.setText(event.target.value),
            }),

            h('button', {
                type: 'submit',
                class: 'add',
                disabled: !form?.default?.checkValidity(),
            }),
        ]),
    ];
});
```

Additionally there's another function from `utils` called `getFormValidity` that accepts a form reference &mdash; for example `event.target` on form submission &mdash; and gives you back a tuple of whether the form is valid, and a list of named form fields that don't pass the native validation. Each invalid form field yields an object of the [validity state](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) and default browser message for the validation failure, which you can customise later on with a `switch`, `if` or even some kind of object map.

```javascript
function handleSubmit(event) {
    // Invoke the `getFormValidity` function to check the form's validity.
    const [isValid, invalidFields] = utils.getFormValidity(event.target);

    // Set the result to the state and re-render the component.
    methods.setFormValidity({ isValid, invalidFields });
}
```

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
map.innerHTML = `{ "imports": { "switzerland": "https://cdn.jsdelivr.net/npm/switzerland@5.0.6/es/index.js", "morphdom": "https://cdn.jsdelivr.net/npm/morphdom@2.6.1/dist/morphdom-esm.js", "redux": "https://cdn.jsdelivr.net/npm/redux@4.0.1/es/redux.mjs", "redux-thunk": "https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js" }}`;

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
