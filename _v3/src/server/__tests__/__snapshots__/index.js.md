# Snapshot report for `src/server/__tests__/index.js`

The actual snapshot is saved in `index.js.snap`.

Generated by [AVA](https://avajs.dev).

## It should be able to render a nested component to string;

> Snapshot 1

    '<x-parent class="resolved"><templatey shadowroot="open"><div><span>Hello</span><x-child class="resolved"><templatey shadowroot="open"><div>Adam</div></templatey></x-child><span>!</span></div></templatey></x-parent>'

## It should be able to render a nested component with attributes to string;

> Snapshot 1

    '<x-parent class="resolved"><templatey shadowroot="open"><div><span>Hello</span><x-child name="Adam" class="resolved"><templatey shadowroot="open"><div>Adam</div></templatey></x-child><span>!</span></div></templatey></x-parent>'

> Snapshot 2

    '<x-parent name="Maria" class="resolved"><templatey shadowroot="open"><div><span>Hello</span><x-child name="Maria" class="resolved"><templatey shadowroot="open"><div>Maria</div></templatey></x-child><span>!</span></div></templatey></x-parent>'

## It should be able to render a shallow component to string by passing pure HTML;

> Snapshot 1

    '<x-example class="resolved"><templatey shadowroot="open"><div>Hello Adam!</div></templatey></x-example>'

## It should be able to render a shallow component to string;

> Snapshot 1

    '<x-example class="resolved"><templatey shadowroot="open"><div>Hello Adam!</div></templatey></x-example>'

## It should be able to render a shallow component with URL params to string;

> Snapshot 1

    '<x-example class="resolved"><templatey shadowroot="open"><div>Hello Adam!</div></templatey></x-example>'

## It should be able to render a shallow component with a HTTP request to string;

> Snapshot 1

    '<x-example class="resolved"><templatey shadowroot="open"><div>Hello Kreszentia!</div></templatey></x-example>'

## It should be able to render a shallow component with attributes to string;

> Snapshot 1

    '<x-example name="Adam" class="resolved"><templatey shadowroot="open"><div>Hello Adam we don\'t know old you are next!</div></templatey></x-example>'

> Snapshot 2

    '<x-example name="Maria" age="28" class="resolved"><templatey shadowroot="open"><div>Hello Maria you are 29 next!</div></templatey></x-example>'

## It should be able to render a shallow component with styles to string;

> Snapshot 1

    '<x-example class="resolved"><templatey shadowroot="open"><section><div>Hello Adam!</div><img src="file:///Users/atimberlake/Switzerland/src/server/images/profile.png" alt="Profile"><style key="file:///Users/atimberlake/Switzerland/src/server/__tests__/styles/index.css" type="text/css">@import "file:///Users/atimberlake/Switzerland/src/server/__tests__/styles/index.css";</style></section></templatey></x-example>'