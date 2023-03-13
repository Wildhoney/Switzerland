import * as type from "../transformers/index.js";

export type EnvContext = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
  isServer: boolean;
  isClient: boolean;
};

type ValueOf<T> = T[keyof T];

export type MapGeneric = Record<string, ValueOf<typeof type>>;

export type AttrsReturn<Map extends MapGeneric> = {
  [K in keyof Map]: ReturnType<Map[K]>;
};

export type LoaderResponse<Initial, State> =
  | {
      error: Error | null;
      loading: true;
      data: Initial;
    }
  | {
      error: Error | null;
      loading: false;
      data: Awaited<State>;
    };
