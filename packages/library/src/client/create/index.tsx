import { render, h } from "preact";
import { memo } from "preact/compat";
import Container from "../../global/container/index.js";
import { SwissAttrs, SwissTree } from "../../global/types/index.js";
import { Env } from "../../global/use/index.js";
import { getAttributes, hasApplicableMutations } from "./utils.js";

export function create<Attrs extends SwissAttrs>(
  name: string,
  Tree: SwissTree<Attrs>
) {
  window.customElements.define(
    name,
    class Swiss extends HTMLElement {
      private observer?: MutationObserver;

      private context = {
        path: window.location.origin,
        root: null,
        node: this,
        isClient: true,
        isServer: false,
      };

      connectedCallback() {
        this.observer = new window.MutationObserver(
          (mutations) =>
            hasApplicableMutations(this, mutations) && this.render()
        );

        this.observer.observe(this, {
          attributes: true,
          attributeOldValue: true,
        });

        this.render();
      }

      disconnectedCallback() {
        this.observer?.disconnect();
      }

      render() {
        const attrs = getAttributes<Attrs>(this.attributes);
        const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });

        render(
          <Env.Provider value={this.context}>
            <Container<Attrs> Tree={Tree} attrs={attrs} />
          </Env.Provider>,
          root
        );
      }
    }
  );

  return memo(
    (attrs: Attrs) => h(name, attrs),
    (nextProps, prevProps) =>
      JSON.stringify(nextProps) === JSON.stringify(prevProps)
  );
}
