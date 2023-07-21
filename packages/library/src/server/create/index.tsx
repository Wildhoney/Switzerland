import Container from "../../global/container/index.js";
import { SwissAttrs, SwissTree } from "../../global/types/index.js";
import { parseName } from "../../global/utils/index.js";
import { forbiddenBoundaryNodes } from "./utils.js";
import { VNode, h } from "preact";

export function create<Attrs extends SwissAttrs>(
  name: string,
  Tree: SwissTree<Attrs>
): (attrs: Attrs) => VNode {
  const element = parseName(name);
  const tag = element.extendElement
    ? element.extendElement
    : element.customElementName;
  const is = element.extendElement ? element.customElementName : false;

  return function Swiss(attrs: Attrs): VNode {
    return h(
      tag,
      { ...attrs, is },
      forbiddenBoundaryNodes.includes(tag) ? (
        <Container<Attrs> Tree={Tree} attrs={attrs} />
      ) : (
        h(
          "template" as string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { shadowrootmode: "open", shadowroot: "open" } as any,
          <Container<Attrs> Tree={Tree} attrs={attrs} />
        )
      )
    );
  };
}
