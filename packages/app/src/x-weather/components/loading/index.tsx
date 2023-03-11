import { VNode, node, use } from "switzerland";
import { Props } from "./types.js";

export default function Loading({ value }: Props): VNode {
  const path = use.path(import.meta.url);

  return (
    <>
      <section class={`loading ${value && "active"}`}>
        <img
          src={path(
            "../../../../src/x-weather/components/loading/images/loading.svg"
          )}
        />
      </section>

      <node.StyleSheet
        href={path("../../../../src/x-weather/components/loading/styles.css")}
      />
    </>
  );
}
