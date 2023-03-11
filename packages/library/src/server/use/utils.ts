export function stripTrailingSlashes(value: null | string): null | string {
  return value?.replace(/(\/)*$/g, "") ?? null;
}
