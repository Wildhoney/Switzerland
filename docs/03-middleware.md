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

# Middleware

At the heart of Switzerland is the concept of middleware which can be applied to your components. More often than not you'll have a common pipeline for your components, and thus it makes sense to export a single [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) function for applying common middleware to all components.

## Once

By default middleware is defined for each **component** rather than each **instance of a component** &ndash; however there are times when you wish to define middleware for the latter, which is where the `once` middleware becomes particularly useful.

In the example below we can issue a HTTP request to fetch the cheeses for each instance of a component. Any subsequent re-renders will simply yield the cached return value.

```javascript
import { create, once, redux, element } from 'switzerland';
import { get } from 'axios';
import { pipe } from 'ramda';

const fetchCheeses = once(() => axios.get('https://cheeses.gov.ch/swiss.json'));

export default create('swiss-cheese', pipe(once(fetchCheeses), redux(store), props => {
    return <h1>We have {props.store.cheeses.length} Swiss cheeses!</h1>
}));
````

### Local Redux State

One clever application for the `once` middleware is instantiate a store per instance..

```javascript
import { createStore as deferStore } from 'redux';

// Initialise the store once the `createStore` has been invoked. When `once` is invoked, it's
// return value is merged into the passed `props`.
const createStore = () => {
    return { localStore: deferStore(locator, applyMiddleware(thunk)) };
};

// Create the middleware function by cherry-picking the previously defined `localStore` from
// `createStore`, utilising the `redux` middleware to pass `store` and `dispatch` to our component.
const localState = props => {
    const { localStore } = once(createStore)(props);
    return { ...props, ...redux(localStore)(props) };
};
```

## Custom

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
