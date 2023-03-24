import { FromCamelcase, ParseNameReturn, ToCamelcase } from "./types.js";

export function parseName(name: string): ParseNameReturn {
  const [customElementName, prototype] = name.split("/");
  const extendElement = prototype ?? null;

  return {
    customElementName,
    prototype: getPrototype(prototype ?? customElementName),
    extendElement,
  };
}

export function getPrototype(name: string): null | CustomElementConstructor {
  if (typeof globalThis.HTMLElement === "undefined") {
    return null;
  }

  return name
    ? (window.document.createElement(name)
        .constructor as CustomElementConstructor)
    : HTMLElement;
}

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
