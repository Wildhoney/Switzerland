# Switzerland

<img src="media/logo.png" alt="Switzerland" width="200" />

> Switzerland takes a functional approach to Web Components by applying middleware to your components. Supports Redux, mobx, attribute mutations, CSS variables, React-esque setState/state, etc&hellip; out-of-the-box, along with Shadow DOM for style encapsulation and Custom Elements for interoperability.

`npm install switzerland --save`

![Travis](http://img.shields.io/travis/Wildhoney/Switzerland.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/switzerland.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=flat-square)

![Screenshot](media/screenshot.png)

---

## Motivation

One of the largest downsides to creating components in React, Vue, Ember, etc... is that we re-invent the wheel time-and-time again with every new framework that comes about. Although their components *may* rely on more generic modules, we are still writing components specific to a certain framework, and typically within a certain version range &mdash; if our setup lies otuside of those contraints then we need to continue our search.

For example, if somebody writes a `<mayan-calendar />` component that works nicely with Mayan dates, wouldn't it be nice if we could use that component wherever, irrespective of our chosen framework and version? If there was a `ReactMayanCalendar` that works with React `15.x` then we'd be out of luck if our setup was Ember based &mdash; or React `16.x` based.

Thankfully by utilising custom elements which are native to the browser, we can write interopable components that can be used **anywhere** &mdash; on their own or in a framework. In addition we inherit other benefits, such as style encapsulation to prevent cross-contamination, and relative loading of CSS documents and associated images.

## Getting Started

<!-- We highly recommend that you use [the CLI](cli) to create Switzerland components, as all of the file creating and setting up is handled automatically. -->

For the most part, Switzerland uses a `create` function and a limited set of middleware functions for creating isolated components. In the "Getting Started" section we'll be creating a cheeseboard because all Swiss like cheese, right?

We'll create the simplest of components consisting of the `create` function, a tag name for the custom element, and the `html` middleware. All this component does is render HTML when the `<swiss-cheeseboard>` component is mounted in the DOM.

```javascript
import { create, h } from 'switzerland';
import { html } from 'switzerland/middleware';

create('swiss-cheeseboard', html(() => {
    return <ul class="cheeseboard" />;
}));
```

> We need to import [`h`](https://github.com/picodom/picodom/blob/master/src/h.js) because that's what the virtual DOM transpiles to: `h.div`, `h.time`, etc...

Although any respectable cheeseboard is decorated with delicious cheese, which we would supply via the attributes of the `<swiss-cheeseboard />` element. We need to apply the `attrs` middleware which reads the node's attributes, and watches for any mutations, causing an efficient re-render of the component [using DOM diffing](https://github.com/picodom/picodom).

```javascript
import { create, h } from 'switzerland';
import { html, attrs } from 'switzerland/middleware';

create('swiss-cheeseboard', attrs(), html(props => {

    return (
        <ul class="cheeseboard">
            {props.attrs.list.split(',').map(cheese => {
                return <li>{cheese}</li>;
            })}
        </ul>
    );

}));
```

> It's worth noting that middleware is compose left-to-right, similar to Ramda's `pipe` function.

Each middleware should take `props` and return `props` that it may or may not augment. Middleware can also be asynchronous, cancel the processing of the middleware, and throw errors. With the `attrs` middleware, it augments the `props` object with the node's attributes which we need to supply when mounting it to the DOM:

```html
<swiss-cheeseboard list="Gruyere,Cheddar,Emmentaler"></swiss-cheeseboard>
```

As HTML attributes are purely string based, we supply the list of cheese as comma-separated values, but frameworks such as React can supply attributes as arrays, objects, symbols, etc... which `Switzerland` components are more than happy to accept. Nevertheless, the passing of non-string based attributes is non-standard, and as such depends on your individual setup. When writing components it's a good idea to support standard behaviour, and non-standard behaviour when possible. In our case we could have used `Array.isArray` to check whether the `list` attribute was passed as a string or an array.

In the `html` middleware we split by a comma, and iterate over the three cheeses, outputting each in an `<li />` element.

If we later decided that a slice of Stilton was called for, we could mutate the attribute using whichever approach we preferred, and the component would re-render.

```javascript
const cheeseboard = document.querySelector('swiss-cheeseboard');
const cheeses = cheeseboard.getAttribute('list');
cheeseboard.setAttribute('list', `${cheeses},Stilton`);
```

Nevertheless we may decide that our cheeseboard should be able to manage its own list of cheeses internally, and supply a form for allowing the addition of further cheeses. `Switzerland` doesn't support React-esque `state/setState` out-of-the-box because it's unnecessary, as a component can re-render by passing in subsequent `props`.

```javascript
import { create, h } from 'switzerland';
import { html, state } from 'switzerland/middleware';

create('swiss-cheeseboard', state({ cheeses: [], value: '' }), html(props => {

    return (
        <section class="cheeseboard">

            <ul>
                {props.state.cheeses.map(cheese => {
                    return <li>{cheese}</li>;
                })}
            </ul>

            <input
                type="text"
                oninput={event => props.render({ value: event.target.value })}
                />

            <button onsubmit={() => props.render({ cheeses: props.value })}>
                Add Cheese
            </button>

        </form>
    );

}));
```

We can use the `state` middleware which simply takes an initial state when invoked, and uses that for the first render. Whenever you make subsequent calls of the `render` function, any passed state will be merged with the *current* state. In our case we're setting the value when it's typed, and then once the button's clicked we're augmenting the `cheeses` array.