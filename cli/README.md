# Switzerland CLI

**npm:** `npm i switzerland-cli -g`
**usage**: `swiss project-name/custom-element-name`

# Getting Stated

Swiss is super straight-forward and uses the same command for similar actions:

* Create a new project **todo** with custom element `<todo-list />`: `swiss todo/todo-list`.
* Create a new custom element `<todo-input />` in the **todo** project: `swiss todo/todo-input`.

Swiss will create the following hierarchy for your elements:

* `todo/images/*`
* `todo/src/todo-list/index.js`
* `todo/src/todo-list/index.test.js`
* `todo/src/todo-list/index.scss`

You'll be able to run the following commands via `npm`:

* `npm run build` to build to directory `dist/` using [Webpack](https://webpack.js.org/).
* `npm run test` to run all related tests using [Ava](https://github.com/avajs/ava).
* `npm run publish` to build and publish via the [Bower](https://bower.io/) registry.

Once published other developers are able to use your custom element(s):

* `bower install todo --save`

Which they can then include in their HTML via the standard `script` tag and use as `<todo-list />`, `<todo-input />`.

Custom elements are also React-friendly and can be included seamlessly into React components, including the passing of props.
