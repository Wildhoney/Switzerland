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

## Browser Support

<img src="https://github.com/alrra/browser-logos/blob/master/chrome/chrome_128x128.png?raw=true" width="64" />
<img src="https://github.com/alrra/browser-logos/blob/master/chrome-canary/chrome-canary_128x128.png?raw=true" width="64" />
<img src="https://github.com/alrra/browser-logos/blob/master/opera/opera_128x128.png?raw=true" width="64" />

Support is required for [Custom Elements](http://caniuse.com/#feat=custom-elements) and [Shadow DOM](http://caniuse.com/#feat=shadowdom) &mdash; both v0 and v1 implementations are supported by Switzerland.

## Getting Started

Components are typically defined using [`pipe`](http://ramdajs.com/docs/#pipe) or [`compose`](http://ramdajs.com/docs/#compose) depending on preference &mdash; however for the simplest component all you need to pass is the name of the component and its render function, which contains the [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) or [`virtual-dom/h`](https://github.com/Matt-Esch/virtual-dom#example).

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

Interestingly due to Switzerland's focus on interoperability you are now able to use `swiss-cheese` as a standard HTML component due to [Custom Elements](https://www.w3.org/TR/custom-elements/).

```javascript
const swissCheese = document.createElement('swiss-cheese');
document.body.appendChild(swissCheese);
```

> Note: `swissCheese` has a `render` function which you can invoke to cause a re-render from outside.

Needless to say that our `swiss-cheese` component is fairly uninteresting as it never updates. Switzerland allows you to add behaviours to your components by applying middleware via `pipe` or `compose`. Middleware allows you to incrementally compose an object of `props` to pass into your component.

Let's allow our users to add cheeses to our `swiss-cheese` component by updating the element's attributes &mdash; for this we can either build our own, or use the pre-existing `attrs` middleware.

```javascript
import { create, element, attrs } from 'switzerland';

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

Although the output will be the same as the previous example, our `swiss-cheese` component now takes in and listens for mutations to its attributes &mdash; causing an [efficient re-render](https://github.com/Matt-Esch/virtual-dom) when a mutation occurs.

```javascript
const swissCheese = document.querySelector('swiss-cheese');
const cheeses = swissCheese.getAttribute('data-cheeses');
swissCheese.setAttribute('data-cheeses', `${cheeses},Mozarella`);
```

It's fair to say that updating a component in this way is rather cumbersome for multiple attributes. Switzerland happily supports Redux, mobx, etc... without introducing third-party components due to the easy nature of [creating your own middleware](#custom-middleware).

## Middleware

At the heart of Switzerland is the concept of middleware which can be applied to your components. More often than not you'll have a common pipeline for your components, and thus it makes sense to export a single [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) function for applying common middleware to all components.

### Once

Using the `once` function allows you to invoke a given function only once for each instance of a component. Oftentimes this is useful for triggering an action when an element has been added to the DOM, such as issuing a HTTP request &mdash; think of it as a functional alternative to React's [`componentDidMount`](https://facebook.github.io/react/docs/component-specs.html).

```javascript
import { create, once, redux, element } from 'switzerland';
import { get } from 'axios';
import { pipe } from 'ramda';

const fetchCheeses = once(() => axios.get('https://cheeses.gov.uk/list.json'));

export default create('user-list', pipe(once(fetchCheeses), redux(store), props => {
    return <h1>We have {props.store.cheeses.length} Swiss cheeses!</h1>
}));
````

### Custom

In this chapter we're going to create a piece of custom middleware that responds to `click` events on the host element &ndash; the element that hosts the shadow boundary.

Setting up **any** middleware requires yielding the `props` that were passed to the middleware function &mdash; whether your augment those `props` or not is optional, and in many cases you may wish to create middleware that has [side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) &ndash; such as in our case.

> Note: When augmenting `props` it's crucial **not** to mutate the object but rather extend it using [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) or the [spread operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator): `{ ...props, augmented: true }`.

```javascript
export default props => {
    return props;    
};
```

All middleware should take in `props` and yield `props` as shown above &mdash; essentially the above creates a no-op middleware. In our case we wish to take `props.node` &mdash; which refers to the host node &mdash; and attach an event listener to it.

```javascript
// Store a reference to each clicked handler, to ensure we don't keep adding
// duplicate event listeners for our host node.
const handlers = new WeakMap();

export default props => {

    // Determine whether a click event has already been defined for this host node.
    const has = handlers.get(props.node);

    // Attach the event listener to the node, only if it doesn't exist already.
    const handler = () => console.log('Host node clicked!');
    !has && handlers.set(props.node, props.node.addEventListener('click', handler));

    // Determine whether the node is still present in the DOM using `isConnected`.
    !props.node.isConnected && (() => {

        // Remove the event listener once the node has been removed from the DOM.
        props.node.removeEventListener('click', handlers.get(props.node));
        handlers.remove(props.node);
        
    })();

    return props;

};
```

It's important that we use `WeakMap` to store a reference to the `click` handler using the `props.node` as the reference, because otherwise we'll have no way to determine if the event listener has already been added. It's also equally as important that we remove the event listener once the node is no longer present in the DOM using [`props.node.isConnected`](https://dom.spec.whatwg.org/#dom-node-isconnected).
