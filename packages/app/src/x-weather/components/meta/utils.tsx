import { Unit, Weather } from "../../types.js";
import { toFahrenheit } from "../../utils.js";
import { node, VNode } from "switzerland";

export const metaData = [
  {
    label: "feels like",
    icon: "feels-like.png",
    getValue(weather: Weather, unit: Unit): VNode {
      return unit === Unit.Celsius ? (
        <>{weather.main.feels_like.toFixed(2)}&#8451;</>
      ) : (
        <>{toFahrenheit(weather.main.feels_like).toFixed(2)}&#8457;</>
      );
    },
  },
  {
    label: "min/max",
    icon: "min-max.png",
    getValue(weather: Weather, unit: Unit): VNode {
      return unit === Unit.Celsius ? (
        <>
          {weather.main.temp_min.toFixed(2)}&deg; &ndash;{" "}
          {weather.main.temp_max.toFixed(2)}&deg;
        </>
      ) : (
        <>
          {toFahrenheit(weather.main.temp_min).toFixed(2)}&deg; &ndash;{" "}
          {toFahrenheit(weather.main.temp_max).toFixed(2)}&deg;
        </>
      );
    },
  },
  {
    label: "pressure",
    icon: "pressure.png",
    getValue(weather: Weather): VNode {
      return <>{weather.main.pressure}p</>;
    },
  },
  {
    label: "humidity",
    icon: "humidity.png",
    getValue(weather: Weather): VNode {
      return <>{weather.main.humidity}</>;
    },
  },
  {
    label: "timezone",
    icon: "timezone.png",
    getValue(weather: Weather): VNode {
      return <>+{weather.timezone / 60 / 60} GMT</>;
    },
  },
  {
    label: "visibility",
    icon: "visibility.png",
    getValue(weather: Weather): VNode {
      return <>{weather.visibility}</>;
    },
  },
  {
    label: "wind",
    icon: "wind.png",
    getValue(weather: Weather): VNode {
      return (
        <>
          {weather.wind.speed}mph ({weather.wind.deg}&deg;)
        </>
      );
    },
  },
];
