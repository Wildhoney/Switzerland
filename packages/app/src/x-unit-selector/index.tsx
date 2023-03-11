import { create, node, use } from "lausanne";
import { Unit } from "../x-weather/types.js";
import { Attrs } from "./types.js";

export default create<Attrs>("x-unit-selector", ({ attrs }) => {
  const path = use.path(import.meta.url);
  const dispatch = use.dispatch<Attrs>();

  return (
    <>
      <section part="container">
        <button
          part="button"
          class={Number(attrs.unit) === Unit.Celsius ? "active" : ""}
          onClick={(): void => dispatch("UnitChange", { unit: Unit.Celsius })}
        >
          C&deg;
        </button>
        <button
          part="button"
          class={Number(attrs.unit) === Unit.Fahrenheit ? "active" : ""}
          onClick={(): void =>
            dispatch("UnitChange", { unit: Unit.Fahrenheit })
          }
        >
          F&deg;
        </button>
      </section>

      <node.StyleSheet href={path("../../src/x-unit-selector/styles.css")} />
    </>
  );
});
