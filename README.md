<img src="media/logo.png" alt="Switzerland" width="200" />

> Switzerland is an experiment in the realm of Web Components through the use of native browser features with a [~4kb core](https://github.com/Wildhoney/Switzerland/blob/master/src/switzerland.js). Use [middleware](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware) to apply behaviours to your components, such as [setState/state](https://github.com/Wildhoney/Switzerland/blob/master/src/middleware/state.js), [Redux](https://github.com/Wildhoney/Switzerland/blob/master/src/middleware/redux.js), mobx. Created with interoperability in mind using Custom Elements, allowing components to be embedded into vanilla, React, Vue, Angular apps with ease. Style encapsulation by default using Shadow DOM.

`npm install switzerland --save`

![Travis](http://img.shields.io/travis/Wildhoney/Switzerland.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/switzerland.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

![Screenshot](media/screenshot-introduction.png)

---

## Table of Contents

1. [Browser Support](#browser-support)
2. [Getting Started](#getting-started)
  1. [Via Attributes](#via-attributes)
  2. [Using State](#using-state)
  3. [Applying Styles](#applying-styles)
  3. [Redux Migration](#redux-migration)
1. [Advanced Usage](#advanced-usage)
  1. [Local Redux](#local-redux)

## Browser Support

<img src="https://github.com/alrra/browser-logos/blob/master/chrome/chrome_128x128.png?raw=true" width="64" />
<img src="https://github.com/alrra/browser-logos/blob/master/chrome-canary/chrome-canary_128x128.png?raw=true" width="64" />
<img src="https://github.com/alrra/browser-logos/blob/master/opera/opera_128x128.png?raw=true" width="64" />

Support is required for [Custom Elements](http://caniuse.com/#feat=custom-elements) and [Shadow DOM](http://caniuse.com/#feat=shadowdom) &mdash; both v0 and v1 implementations are supported by Switzerland.

## Getting Started

Components are typically defined using [`pipe`](http://ramdajs.com/docs/#pipe) or [`compose`](http://ramdajs.com/docs/#compose) depending on preference &mdash; however for the simplest component all you need to pass is the name of the component and its render function, which contains the [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) or [`virtual-dom/h`](https://github.com/Matt-Esch/virtual-dom#example) markup.

```javascript
import { create, html, element } from 'switzerland';

create('swiss-cheese', html(() => {

    return (
        <ul>
            <li>Swiss</li>
            <li>Feta</li>
            <li>Cheddar</li>
        </ul>
    );

}));
```

> Note: You need to import `element` if you're using the JSX syntax.

Interestingly due to Switzerland's focus on interoperability you are now able to use `swiss-cheese` as a standard HTML component thanks to [Custom Elements](https://www.w3.org/TR/custom-elements/).

```javascript
const swissCheese = document.createElement('swiss-cheese');
document.body.appendChild(swissCheese);
```

> Note: `swissCheese` has a `render` function which you can invoke to cause a re-render from outside.

## Via Attributes

Needless to say that our `swiss-cheese` component is fairly uninteresting as it never updates. Switzerland allows you to add behaviours to your components by applying middleware via `pipe` or `compose`. Middleware allows you to incrementally compose an object of `props` to pass into your component.

Let's allow our users to add cheeses to our `swiss-cheese` component by updating the element's attributes &mdash; for this we can either build our own, or use the pre-existing `attrs` middleware.

```javascript
import { create, html, element, pipe, attrs } from 'switzerland';

create('swiss-cheese', pipe(attrs, html(props => {

    const cheeses = props.attrs.cheeses.split(',');

    return (
        <ul>
            {cheeses.map(cheese => {
                return <li>{cheese}</li>
            })}
        </ul>
    );

})));
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

## Using State

Since using attributes isn't the most friendly way to update components we can instead choose to use another state manager &ndash; such as the React-esque `setState`/`state` approach.

> Note: Try playing with the [JSFiddle we've created](https://jsfiddle.net/chs2fnod/)!

```javascript
import { create, html, element, pipe, state } from 'switzerland';

const initialState = {
    cheeses: ['Swiss', 'Feta', 'Cheddar']
};

create('swiss-cheese', pipe(state(initialState), html(props => {

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

})));
```

By applying the `state` middleware to the `swiss-cheese` component, we have two additional properties added to our `props` &ndash; `setState` and `state`. Each **instance of a component** will receive a fresh `state` and thus can be mutated independently regardless of how many `swiss-cheese` nodes there are present in the DOM.

## Applying Styles

Now that we have a functioning `swiss-cheese` component, the next logical step would be applying styles to the component. Switzerland supports attaching CSS and JS files to the component by using the `include` middleware.

```javascript
import { create, html, element, pipe, state, include, pathFor } from 'switzerland';

const initialState = {
    cheeses: ['Swiss', 'Feta', 'Cheddar']
};

create('swiss-cheese', pipe(state(initialState), include(pathFor('css/swiss-cheese.css')), html(props => {

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

})));
```

> Note: Relative paths in the CSS document are retained out-of-the-box.

Once the component is mounted in the DOM, the attached CSS document will be fetched and loaded into the **shadow boundary** of our `swiss-cheese` component, and thus inherit Web Component's enviable [style encapsulation](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-style-scoped).

```css
:host {
    background: yellow url('../images/cheese.png');
    border-radius: 3px;
    font-size: 8rem;
}
```

During the fetching phase, the **host component** &mdash; `swiss-cheese` &mdash; will have a class name of `resolving`, whereas after **all** files have been downloaded and attached, the `resolving` class name will be replaced with `resolved` &ndash; this allows you to apply clever behaviour, such as hiding the component until the styles have been applied.

```html
<swiss-cheese class="resolving">
    <!-- ... -->
</swiss-cheese>
```

You may also have noticed that instead of declaring the absolute path to `swiss-cheese.css` which would include the component name and thus break encapsulation, we instead use the `pathFor` function which determines the path of the current component which allows us to handily declare the path to the CSS document relatively. It's worth noting that the `path` constant is simply the path to the current component.

## Redux Migration

While using `state` and `setState` work just fine, the functional approach these days to managing state is via [Redux](https://github.com/reactjs/redux) which can be enabled in Switzerland by using the tiny `redux` middleware.

> Note: It's worth remembering that **all** middleware should be tiny.

If you're unsure how Redux works then it's worth [glancing over the docs](http://redux.js.org/), as the intricacies of Redux won't be covered. Assuming we want to keep the same functionality as before, we can simply migrate piece-by-piece until we achieve that.

```javascript
import { create, html, element, pipe, redux, include, pathFor } from 'switzerland';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    cheeses: ['Swiss', 'Feta', 'Cheddar']
};

function cheese(state = initialState, action) {

    switch (action.type) {
        case 'ADD': return { ...state, cheeses: [action.cheese, ...state.cheeses] };
        default:    return state;
    }

}

const store = createStore(cheese, applyMiddleware(thunk));

create('swiss-cheese', pipe(redux(store), include(pathFor('css/swiss-cheese.css')), html(props => {

    const cheeses = props.redux.cheeses;

    return (
        <ul>
            {cheeses.map(cheese => {
                return <li>{cheese}</li>
            })}
            <li>
                <a onclick={() => props.dispatch({ type: 'ADD', cheese: 'Mozarella' })}>
                    Add Mozarella
                </a>
            </li>
        </ul>
    );

})));
```

For the most part the above example is largely Redux boilerplate &ndash; the actual integration with Switzerland occurs in the `redux` middleware which takes the store instance created by Redux's `createStore`. Whenever an event is dispatched &mdash; in our case adding Mozarella &mdash; the `swiss-cheese` component is re-rendered.

## Advanced Usage

![Screenshot](media/screenshot-advanced.png)

### Local Redux

Using Switzerland's middleware makes it exceptionally simple to have a [local Redux store **per instance**](https://github.com/threepointone/redux-react-local). In Redux you are highly encouraged to maintain a single state tree for your entire application, as this has untold benefits for application development &ndash; nonetheless, the concept of a local Redux store is an interesting one, and may have its own benefits if `state`/`setState` isn't your cup of tea.

```javascript
// ...

const localStore = props => {
    const local = createStore(cheese, applyMiddleware(thunk));
    return { ...redux(local)(props), redux: local };
};

const storeProps = props => {
    return { ...props, redux: props.redux.getState() };
};

create('swiss-cheese', pipe(once(localStore), storeProps, include(pathFor('css/swiss-cheese.css')), html(props => {

    const cheeses = props.redux.cheeses;

    return (
        <ul>
            {cheeses.map(cheese => {
                return <li>{cheese}</li>
            })}
            <li>
                <a onclick={() => props.dispatch({ type: 'ADD', cheese: 'Mozarella' })}>
                    Add Mozarella
                </a>
            </li>
        </ul>
    );

})));
```

> Note: When using the `once` middleware, the return value is automatically merged into the `props`.

Previously if you had multiple `swiss-cheese` nodes in the DOM, they would **all** share the same store and thus update simultaneously &ndash; using the concept of a local Redux store, each `swiss-cheese` node maintains its own state.

In the component's `pipe` you'll notice two additional middleware items being passed &ndash; firstly `localStore` which is wrapped in the `once` middleware, meaning it's only invoked **once per instance** and any subsequent invocations will merely yield the cached `store` result, and secondly the `storeProps` middleware which overwrites the `redux` property by passing a fresh copy of the current state to our component, otherwise the state from the `localStore` middleware would be passed, and as that's wrapped in `once` would yield a stale state tree after the first invocation.
