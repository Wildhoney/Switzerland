import { createContext } from "preact";
import {
  EffectCallback,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useLayoutEffect,
  useRef,
  useId,
  useErrorBoundary,
  useImperativeHandle,
  useDebugValue,
} from "preact/hooks";
import { AttrsContext, AttrsReturn, EnvContext, MapGeneric } from "./types.js";

export const Env = createContext<EnvContext>({
  path: null,
  root: null,
  node: null,
  isServer: false,
  isClient: false,
});

export const Attrs = createContext<AttrsContext>({});

export const use = {
  memo: useMemo,
  state: useState,
  effect: useEffect,
  callback: useCallback,
  reducer: useReducer,
  layoutEffect: useLayoutEffect,
  ref: useRef,
  id: useId,
  imperativeHandle: useImperativeHandle,
  errorBoundary: useErrorBoundary,
  debugValue: useDebugValue,
  mount: (fn: EffectCallback) => useEffect(fn, []),
  unmount: (fn: EffectCallback) => useEffect(() => fn, []),
  env: () => useContext(Env),
  attrs<Map extends MapGeneric>(map: Map): AttrsReturn<Map> {
    const attrs = useContext(Attrs);

    return Object.entries(attrs).reduce(
      (attrs, [key, value]) => ({
        ...attrs,
        [key]: ((map[key] ?? String) as any)(value),
      }),
      {}
    ) as AttrsReturn<typeof map>;
  },
};
