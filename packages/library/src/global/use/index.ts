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
import { String } from "../transformers/index.js";
import { SwissAttrs } from "../types/index.js";
import { AttrsReturn, EnvContext, AttrsMap } from "./types.js";

export const Env = createContext<EnvContext>({
  path: null,
  root: null,
  node: null,
  isServer: false,
  isClient: false,
});

export const Attrs = createContext<SwissAttrs>({});

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
  attrs<Map extends AttrsMap>(map: Map): AttrsReturn<Map> {
    const attrs = useContext(Attrs);

    return Object.entries(attrs).reduce((attrs, [key, value]) => {
      const transform = map[key] ?? String;

      return {
        ...attrs,
        [key]: value ? transform(value as string) : null,
      };
    }, {}) as AttrsReturn<typeof map>;
  },
};
