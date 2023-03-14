export type EnvContext = {
  path: null | string;
  root: null | string;
  node: null | HTMLElement;
  isServer: boolean;
  isClient: boolean;
};

export type AttrsMap = Record<string, (arg: string) => unknown>;

export type AttrsReturn<Map extends AttrsMap> = {
  [K in keyof Map]: ReturnType<Map[K]>;
};

export type LoaderReturn<Initial, State> =
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
