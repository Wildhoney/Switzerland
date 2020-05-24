window.customElements.define(
  "x-avatar",
  class extends HTMLElement {
    connectedCallback() {
      console.log("Here");
    }
  }
);

// import morph from "https://cdn.jsdelivr.net/npm/morphdom@2.6.1/dist/morphdom-esm.js";

// const app = document.querySelector("section.main");

// function getNode(name, attrs) {
//   const isFunction = typeof name === "function";
//   const isComponent = name.type === Component;

//   if (isComponent) {
//     const node = document.createElement(name.name);
//     morph(
//       node,
//       name.middleware.map((middleware) => middleware({ attrs }))
//     );
//     return node;
//   }

//   return isFunction ? name({ attrs }) : document.createElement(name);
// }

// function h(name, attrs, children) {
//   const node = getNode(name, attrs);

//   Object.entries(attrs).forEach(([key, value]) =>
//     node.setAttribute(key, value)
//   );

//   [].concat(children).forEach((child) => {
//     const isString = typeof child === "string";
//     if (!isString && !(child instanceof HTMLElement)) return;
//     node.appendChild(isString ? document.createTextNode(child) : child);
//   });

//   return node;
// }

// const Component = Symbol("Switzerland/Component");

// function create(name, ...middleware) {
//   return { type: Component, name, middleware };
// }

// const Layout = async ({ attrs }) => {
//   return h("section", { class: "main" }, [
//     h("p", {}, `Hi ${attrs.name}`),
//     h(Avatar, { name: attrs.name }),
//   ]);
// };

// const Avatar = create("x-avatar", ({ attrs }) => {
//   return h("p", { name: attrs.name }, "Changed");
// });

// async function main() {
//   const initialProps = { attrs: { name: "Maria" } };
//   const html = await Layout(initialProps);

//   return morph(app, html, {
//     onBeforeElUpdated(fromEl, toEl) {
//       const isCustomElement = fromEl.nodeName.toLowerCase() === "x-avatar";

//       if (isCustomElement) {
//         toEl.innerHTML = fromEl.innerHTML;
//         return toEl;
//       }

//       return toEl;
//     },
//   });
// }

// main();
