import Container from "../../global/container/index.js";
import { SwissAttrs, SwissTree } from "../../global/types/index.js";
import { Env } from "../../global/use/index.js";
import { EnvContext } from "../../global/use/types.js";
import {
  getAttributes,
  hasApplicableMutations,
  serialiseAttributes,
} from "./utils.js";
import { VNode, h, render } from "preact";
import { memo } from "preact/compat";

export function create<Attrs extends SwissAttrs>(
  name: string,
  Tree: SwissTree<Attrs>
): (attrs: Attrs) => VNode {
  customElements.define(
    name,
    class Swiss extends HTMLElement {
      private context = {
        path: location.origin,
        root: null,
        node: this,
        isClient: true,
        isServer: false,
      } satisfies EnvContext;

      private observer: MutationObserver = new MutationObserver(
        (mutations: MutationRecord[]) =>
          hasApplicableMutations(this, mutations) && this.render()
      );

      connectedCallback(): void {
        this.observer.observe(this, {
          attributes: true,
          attributeOldValue: true,
        });

        this.render();
      }

      disconnectedCallback(): void {
        this.observer.disconnect();
      }

      render(): void {
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
    (attrs: Attrs): VNode => h(name, attrs),
    (nextProps, prevProps): boolean =>
      serialiseAttributes(nextProps) === serialiseAttributes(prevProps)
  );
}
