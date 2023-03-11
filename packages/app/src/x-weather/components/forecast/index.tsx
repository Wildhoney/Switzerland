import { Unit } from "../../types.js";
import { Props } from "./types.js";
import { node, use } from "lausanne";
import { toFahrenheit, toSlug } from "../../utils.js";

export default function Forecast({ city, weather, unit }: Props) {
  const path = use.path(import.meta.url);

  return (
    <>
      <section class="forecast">
        <img
          src={path(
            `../../../../src/x-weather/images/places/${toSlug(city)}.png`
          )}
          part="logo"
          alt={city}
        />

        <p class="description">
          <span>{weather.weather[0].description}</span> in {city}
        </p>

        <div class="reading">
          {unit === Unit.Celsius && <>{weather.main.temp.toFixed(2)}&#8451;</>}
          {unit === Unit.Fahrenheit && (
            <>{toFahrenheit(weather.main.temp).toFixed(2)}&#8457;</>
          )}
        </div>
      </section>

      <node.StyleSheet
        href={path("../../../../src/x-weather/components/forecast/styles.css")}
      />
    </>
  );
}
