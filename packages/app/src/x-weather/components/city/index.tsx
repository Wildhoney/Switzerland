import { VNode, node, use } from "switzerland";
import Coordinates from "../coordinates/index.js";
import Forecast from "../forecast/index.js";
import Meta from "../meta/index.js";
import Places from "../places/index.js";
import { Props } from "./types.js";
import UnitSelector from "../../../x-unit-selector/index.js";

export default function City({
  city,
  weather,
  unit,
  onUnitChange,
}: Props): VNode {
  const path = use.path(import.meta.url);

  return (
    <>
      <section class="city">
        <div class="forecast">
          <Forecast city={city} unit={unit} weather={weather} />
        </div>

        <div class="details">
          <Meta weather={weather} unit={unit} />
          <Places value={city} />
        </div>
      </section>

      <UnitSelector
        unit={unit}
        onUnitChange={(event) => onUnitChange(event.detail.unit)}
      />
      <Coordinates value={weather.coord} />

      <node.StyleSheet
        href={path("../../../../src/x-weather/components/city/styles.css")}
      />
    </>
  );
}
