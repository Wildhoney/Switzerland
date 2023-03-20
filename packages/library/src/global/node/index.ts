import { fromCamelcase } from "../utils/index.js";
import { StyleSheetProps, VariablesProps } from "./types.js";
import { Fragment, VNode, h } from "preact";
import { useMemo } from "preact/hooks";

export const node = {
  h,
  Fragment,
  StyleSheet({ href, media }: StyleSheetProps): VNode {
    return h("link", { rel: "stylesheet", type: "text/css", media, href });
  },
  Variables({ container = ":host", ...props }: VariablesProps): VNode {
    const vars = useMemo(() => {
      return Object.entries(props).reduce(
        (accum, [key, value]) =>
          `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
        ""
      );
    }, [props]);

    return h("style", { type: "text/css" }, `${container} { ${vars} }`);
  },
};
