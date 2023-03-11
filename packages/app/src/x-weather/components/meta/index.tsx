import { VNode, node, use } from "switzerland";
import { Props } from "./types.js";
import { metaData } from "./utils.js";

export default function Meta({ weather, unit }: Props): VNode {
  const path = use.path(import.meta.url);

  return (
    <>
      <section class="meta">
        {metaData.map((meta) => (
          <div key={meta.label} class="detail">
            <img
              class="icon"
              src={path(
                `../../../../src/x-weather/components/meta/images/${meta.icon}`
              )}
            />

            <div class="item">
              <label>{meta.label}:</label>
              <div class="value">{meta.getValue(weather, unit)}</div>
            </div>
          </div>
        ))}
      </section>

      <node.StyleSheet
        href={path("../../../../src/x-weather/components/meta/styles.css")}
      />
    </>
  );
}
