import { Props } from "./types.js";
import { node, use } from "lausanne";

export default function Coordinates({ value }: Props) {
  const path = use.path(import.meta.url);

  return (
    <>
      <section class="coordinates">
        Lat/lng: {value.lat}, {value.lon}
      </section>

      <node.StyleSheet
        href={path(
          "../../../../src/x-weather/components/coordinates/styles.css"
        )}
      />
    </>
  );
}
