export type ParseNameReturn = {
  customElementName: string;
  prototype: null | CustomElementConstructor;
  extendElement: null | string;
};

export type ToCamelcase = { fromKebab: () => string; fromSnake: () => string };

export type FromCamelcase = { toKebab: () => string; toSnake: () => string };
