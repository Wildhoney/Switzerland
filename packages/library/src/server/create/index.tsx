import Container from "../../global/container/index.js";
import { SwissAttrs, SwissTree } from "../../global/types/index.js";
import { VNode, h } from "preact";

export function create<Attrs extends SwissAttrs>(
  name: string,
  Tree: SwissTree<Attrs>
): (attrs: Attrs) => VNode {
  return function Swiss(attrs: Attrs): VNode {
    return h(
      name,
      attrs,
      h(
        "template" as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { shadowroot: "open" } as any,
        <Container<Attrs> Tree={Tree} attrs={attrs} />
      )
    );
  };
}
