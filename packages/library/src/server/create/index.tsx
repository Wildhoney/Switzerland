import { h, VNode } from "preact";
import SwissTree from "../../global/tree/index.js";
import { AttrsGeneric, SwissAttrs } from "../../global/types/index.js";

export function create<Attrs extends AttrsGeneric = Record<string, never>>(
  name: string,
  Tree: (attrs: SwissAttrs<Attrs>) => VNode
) {
  return function Swiss(attrs: Attrs) {
    return h(
      name,
      attrs,
      h(
        "template" as any,
        { shadowroot: "open" } as any,
        <SwissTree Tree={Tree} attrs={attrs} />
      )
    );
  };
}
