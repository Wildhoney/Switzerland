import { FromCamelcase, ToCamelcase } from "./types.js";

export function toCamelcase(value: string): ToCamelcase {
  const f = (separator: string) => (): string => {
    const r = new RegExp(`(${separator}\\w)`, "g");
    return value.replace(r, (match) => match[1].toUpperCase());
  };

  return {
    fromKebab: f("-"),
    fromSnake: f("_"),
  };
}

export function fromCamelcase(value: string): FromCamelcase {
  const f = (separator: string) => (): string => {
    return value.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
  };

  return {
    toKebab: f("-"),
    toSnake: f("_"),
  };
}
