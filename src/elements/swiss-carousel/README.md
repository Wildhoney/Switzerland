# Swiss Carousel

Use the `swiss-carousel` component by provided a list of images &ndash; either `img` or responsive `picture` tags &ndash; in a `template` tag as a child of the `swiss-carousel` component.

```html
<swiss-carousel>
    <template>
        <img src="/path/to/image/1.jpg" />
        <img src="/path/to/image/2.jpg" />
        <img src="/path/to/image/3.jpg" />
    </template>
</swiss-carousel>
```

By default the carousel will be horizontal, however you can change that by providing the `direction` attribute to the element with a value of either `horizontal` or `vertical`.

```html
<swiss-carousel direction="vertical" />
```

You'll notice that when you drop in the `swiss-carousel` component its not visible. To make it visibile you need to define its dimensions in your styles.

```css
swiss-carousel {
    width: 50vw;
    height: 200px;
}
```

You can style the previous and next links &ndash; such as adding arrows to them &ndash; by referencing the `previous-link` and `next-link` parts in your CSS. For instance to get `next-link` to consume 2/3 of the space rather than 1/2.

```css
swiss-carousel::part(next-link) {
    flex: 2;
}
```

Also provided are a set of variables that you can use to override animation speed and the images' position and fit.

```css
swiss-carousel {
    --image-fit: contain;
    --image-position: left;
    --animation-duration: 1s;
}
```
