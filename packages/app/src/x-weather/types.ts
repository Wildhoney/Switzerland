import { Static, Type } from "@sinclair/typebox";

export const Attrs = Type.Object({
  city: Type.String(),
});

export type Attrs = Static<typeof Attrs>;

export const enum Unit {
  Celsius,
  Fahrenheit,
}

export const Weather = Type.Object({
  main: Type.Object({
    temp: Type.Number(),
    feels_like: Type.Number(),
    temp_min: Type.Number(),
    temp_max: Type.Number(),
    pressure: Type.Number(),
    humidity: Type.Number(),
  }),
  visibility: Type.Number(),
  wind: Type.Object({
    speed: Type.Number(),
    deg: Type.Number(),
  }),
  timezone: Type.Number(),
  weather: Type.Array(
    Type.Object(
      { description: Type.String(), icon: Type.String() },
      { minProperties: 1 }
    )
  ),
  coord: Type.Object({
    lon: Type.Number(),
    lat: Type.Number(),
  }),
});

export type Weather = Static<typeof Weather>;
