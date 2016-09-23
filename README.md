<img src="media/logo.png" alt="Switzerland" width="200" />

> <span style="color: #ff0000">Switzerland</span> is an experiment in the realm of Web Components through the use of native browser features with a [~4kb core](https://github.com/Wildhoney/Switzerland/blob/master/src/switzerland.js). Use [middleware](https://github.com/Wildhoney/Switzerland/tree/master/src/middleware) to apply behaviours to your components, such as [setState/state](https://github.com/Wildhoney/Switzerland/blob/master/src/middleware/state.js), [Redux](https://github.com/Wildhoney/Switzerland/blob/master/src/middleware/redux.js), mobx. Created with interoperability in mind using Custom Elements, allowing components to be embedded into vanilla, React, Vue, Angular apps with ease. Style encapsulation by default using Shadow DOM.

---

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

Interestingly due to <span style="color: #ff0000">Switzerland</span>'s focus on interoperability you are now able to use `swiss-cheese` as a standard HTML component due to [Custom Elements](https://www.w3.org/TR/custom-elements/).

```javascript
const swissCheese = document.createElement('swiss-cheese');
document.body.appendChild(swissCheese);
```

Needless to say that our `swiss-cheese` component is fairly uninteresting as it never updates. <span style="color: #ff0000">Switzerland</span> allows you to add behaviours to your components by applying middleware via `pipe` or `compose`. Middleware allows you to incrementally compose an object of `props` to pass into your component.

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

It's fair to say that updating a component in this way is rather cumbersome for multiple attributes. <span style="color: #ff0000">Switzerland</span> happily supports Redux, mobx, etc... without introducing third-party components due to the easy nature of creating your own middleware.
