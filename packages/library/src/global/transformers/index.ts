export function String(a: string): string {
  return a;
}

export function Int(a: string): null | number {
  const value = parseInt(a);
  return Number.isNaN(value) ? null : value;
}

export function BigInt(a: string): null | bigint {
  try {
    return window.BigInt(a);
  } catch {
    return null;
  }
}

export function Float(a: string): null | number {
  const value = parseFloat(a);
  return Number.isNaN(value) ? null : value;
}

Float.DP =
  (dp: number) =>
  (a: string): null | number => {
    const value = Float(a);
    return value === null ? null : Float(value.toFixed(dp));
  };

export const Bool = (a: string): null | boolean => {
  switch (a.toLowerCase()) {
    case "":
    case "1":
    case "true":
    case "on":
    case "yes":
      return true;
    case "0":
    case "false":
    case "off":
    case "no":
      return false;
  }

  return null;
};

export function Date(a: string): null | Date {
  const value = new window.Date(window.Date.parse(a));
  return Number.isNaN(value.getTime()) ? null : value;
}

type P =
  | typeof String
  | typeof Int
  | typeof Bool
  | typeof Date
  | typeof Float
  | typeof BigInt;

type R<F extends (...args: any[]) => any> = ReturnType<F>;

export function Array<T extends P>(t: T): (t: string) => R<T>[] {
  return (a: string) => {
    return a.split(",").map((a) => t(a)) as R<T>[];
  };
}

export function Tuple<A extends P>(a: A): (t: string) => [R<A>];
export function Tuple<A extends P, B extends P>(
  a: A,
  b: B
): (t: string) => [R<A>, R<B>];
export function Tuple<A extends P, B extends P, C extends P>(
  a: A,
  b: B,
  c: C
): (t: string) => [R<A>, R<B>, R<C>];
export function Tuple<A extends P, B extends P, C extends P, D extends P>(
  a: A,
  b: B,
  c: C,
  d: D
): (t: string) => [R<A>, R<B>, R<C>, R<D>];
export function Tuple<
  A extends P,
  B extends P,
  C extends P,
  D extends P,
  E extends P
>(a: A, b: B, c: C, d: D, e: E): (t: string) => [R<A>, R<B>, R<C>, R<D>, R<E>];
export function Tuple(...fs: ((a: string) => string)[]) {
  return (a: string): string[] =>
    a.split(",").map((a, index) => {
      const f = fs[index] ?? String;
      return f(a);
    });
}

// export function Regex(expression: RegExp) {
//   return (a: string): Record<string, null | string> => {
//     const captureGroups = [];
//     const namedGroups = expression.toString().matchAll(/\?<(.+?)>/gi);

//     for (const group of namedGroups) {
//       captureGroups.push(group[1]);
//     }

//     const match = a.match(expression);

//     return captureGroups.reduce(
//       (model, key) => ({ ...model, [key]: model?.[key] ?? null }),
//       match?.groups ?? {}
//     );
//   };
// }
