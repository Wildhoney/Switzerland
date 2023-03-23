import Container from "../../global/container/index.js";
import { SwissAttrs, SwissTree } from "../../global/types/index.js";
import { parseName } from "../../global/utils/index.js";
import { VNode, h } from "preact";

export function create<Attrs extends SwissAttrs>(
  name: string,
  Tree: SwissTree<Attrs>
): (attrs: Attrs) => VNode {
  const element = parseName(name);

  return function Swiss(attrs: Attrs): VNode {
    return h(
      element.extendElement ? element.extendElement : element.customElementName,
      {
        ...attrs,
        is: element.extendElement ? element.customElementName : false,
      },
      h(
        "template" as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { shadowroot: "open" } as any,
        <Container<Attrs> Tree={Tree} attrs={attrs} />
      )
    );
  };
}
