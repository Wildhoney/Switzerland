import { Unit, Weather } from "../../types.js";

export type Props = {
  city: string;
  weather: Weather;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
};
