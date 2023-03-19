import { Props } from "./types.js";
import { use, node } from "switzerland";
import { places } from "../../utils.js";

export default function Places({ value }: Props) {
  const env = use.env();
  const path = use.path(import.meta.url);

  const handleChange = use.callback((event: Event) => {
    env.node?.setAttribute("city", (event?.target as any).value);
  }, []);

  return (
    <>
      <section class="places">
        <select value={value} disabled={env.isServer} onChange={handleChange}>
          {places.map((place) => (
            <option key={`${place.city}-${place.country}`} value={place.city}>
              {place.city}, {place.country}
            </option>
          ))}
        </select>
      </section>

      <node.StyleSheet
        href={path("../../../../src/x-weather/components/places/styles.css")}
      />
    </>
  );
}
