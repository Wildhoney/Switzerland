import { SwissTree, SwissAttrs } from "../types/index.js";

export type State = { error: null | Error };

export type Props<Attrs extends SwissAttrs> = {
  attrs: Attrs;
  Tree: SwissTree<Attrs>;
};
