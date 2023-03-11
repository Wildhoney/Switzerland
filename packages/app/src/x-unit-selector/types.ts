import { Static, Type } from "@sinclair/typebox";
import { Unit } from "../x-weather/types.js";

const AttrsUnit = Type.Union([
  Type.Literal(Unit.Celsius),
  Type.Literal(Unit.Fahrenheit),
]);

export const Attrs = Type.Object({
  unit: AttrsUnit,
  onUnitChange: Type.Function(
    [
      Type.Object({
        detail: Type.Object({
          unit: AttrsUnit,
        }),
      }),
    ],
    Type.Void()
  ),
});

export type Attrs = Static<typeof Attrs>;
