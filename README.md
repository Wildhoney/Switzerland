<img src="media/logo.png" alt="Switzerland" width="200" />

> Switzerland is an experiment in the realm of Web Components through the use of native browser features with a [~4kb core](https://github.com/Wildhoney/Switzerland/blob/master/src/switzerland.js). Use [middleware](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware) to apply behaviours to your components, such as [setState/state](https://github.com/Wildhoney/Switzerland/blob/master/src/middleware/state.js), [Redux](https://github.com/Wildhoney/Switzerland/blob/master/src/middleware/redux.js), mobx. Created with interoperability in mind using Custom Elements, allowing components to be embedded into vanilla, React, Vue, Angular apps with ease. Style encapsulation by default using Shadow DOM.

`npm install switzerland --save`

![Travis](http://img.shields.io/travis/Wildhoney/Switzerland.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/switzerland.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

![Screenshot](media/screenshot.png)

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Browser Support](#browser-support)
3. [Middleware](docs/03-middleware.md)
  1. [Once](docs/03-middleware.md#once)

## Browser Support

<img src="https://github.com/alrra/browser-logos/blob/master/chrome/chrome_128x128.png?raw=true" width="64" />
<img src="https://github.com/alrra/browser-logos/blob/master/chrome-canary/chrome-canary_128x128.png?raw=true" width="64" />
<img src="https://github.com/alrra/browser-logos/blob/master/opera/opera_128x128.png?raw=true" width="64" />

Support is required for [Custom Elements](http://caniuse.com/#feat=custom-elements) and [Shadow DOM](http://caniuse.com/#feat=shadowdom) &mdash; both v0 and v1 implementations are supported by Switzerland.

## Getting Started

Components are typically defined using [`pipe`](http://ramdajs.com/docs/#pipe) or [`compose`](http://ramdajs.com/docs/#compose) depending on preference &mdash; however for the simplest component all you need to pass is the name of the component and its render function, which contains the [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) or [`virtual-dom/h`](https://github.com/Matt-Esch/virtual-dom#example) markup.

```javascript
import { create, element } from 'switzerland';

create('swiss-cheese', () => {

    return (
        <ul>
            <li>Swiss</li>
            <li>Feta</li>
            <li>Cheddar</li>
        </ul>
    );

});
```

> Note: You need to import `element` if you're using the JSX syntax.

Interestingly due to Switzerland's focus on interoperability you are now able to use `swiss-cheese` as a standard HTML component thanks to [Custom Elements](https://www.w3.org/TR/custom-elements/).

```javascript
const swissCheese = document.createElement('swiss-cheese');
document.body.appendChild(swissCheese);
```

> Note: `swissCheese` has a `render` function which you can invoke to cause a re-render from outside.

Needless to say that our `swiss-cheese` component is fairly uninteresting as it never updates. Switzerland allows you to add behaviours to your components by applying middleware via `pipe` or `compose`. Middleware allows you to incrementally compose an object of `props` to pass into your component.

Let's allow our users to add cheeses to our `swiss-cheese` component by updating the element's attributes &mdash; for this we can either build our own, or use the pre-existing `attrs` middleware.

```javascript
import { create, element, pipe, attrs } from 'switzerland';

create('swiss-cheese', pipe(attrs, props => {

    const cheeses = props.attrs.cheeses.split(',');

    return (
        <ul>
            {cheeses.map(cheese => {
                return <li>{cheese}</li>
            })}
        </ul>
    );

}));
```

Using HTML directly we can add the `swiss-cheese` component to our document, passing in the expected `cheeses` attribute as a [data attribute](http://html5doctor.com/html5-custom-data-attributes/).

```html
<swiss-cheese data-cheeses="Swiss,Feta,Cheddar"></swiss-cheese>
````

> Note: All attributes are [camelized](https://github.com/domchristie/humps#usage) and prefixes of `data-` will be stripped.

Although the output will be the same as the previous example, our `swiss-cheese` component now takes in and listens for mutations to its attributes &mdash; causing an [efficient re-render](https://github.com/Matt-Esch/virtual-dom) when a mutation occurs.

```javascript
const swissCheese = document.querySelector('swiss-cheese');
const cheeses = swissCheese.getAttribute('data-cheeses');
swissCheese.setAttribute('data-cheeses', `${cheeses},Mozarella`);
```

It's fair to say that updating a component in this way is rather cumbersome for multiple attributes. Switzerland happily supports setState, Redux, mobx, etc... without introducing third-party components due to the easy nature of creating your own middle.

In the next example we're going to migrate from using an element's attributes to using the React-esque `setState`/`state` approach.

```javascript
import { create, element, pipe, state } from 'switzerland';

const initialState = {
    cheeses: ['Swiss', 'Feta', 'Cheddar']
};

create('swiss-cheese', pipe(state(initialState), props => {

    const cheeses = props.state.cheeses;

    return (
        <ul>
            {cheeses.map(cheese => {
                return <li>{cheese}</li>
            })}
            <li>
                <a onclick={() => props.setState({ cheeses: ['Mozarella', ...cheeses] })}>
                    Add Mozarella
                </a>
            </li>
        </ul>
    );

}));
```
