import { useContext } from "preact/hooks";
import { parse, join } from "node:path";
import { Env, use as baseUse } from "../../global/use/index.js";
import { stripTrailingSlashes } from "./utils.js";
import {
  DispatchEventOptions,
  DispatchEventPayload,
  SwissAttrs,
  SwissEvent,
} from "../../global/types/index.js";
import { Loader } from "../render/index.js";
import { LoaderReturn } from "../../global/use/types.js";

export const use = {
  ...baseUse,
  path(componentPath: string) {
    const env = useContext(Env);
    const componentDir = parse(componentPath.replace("file://", "")).dir;

    return (resourcePath: string): string => {
      if (!env.root) return "";
      const assetPath = join(componentDir, resourcePath).replace(env.root, "");
      return `${stripTrailingSlashes(env.path)}${assetPath}`;
    };
  },
  dispatch<Attrs>() {
    return (
      name: Attrs extends SwissAttrs ? SwissEvent<keyof Attrs> : string,
      payload: DispatchEventPayload,
      options: DispatchEventOptions = {}
    ): void => {
      void [name, payload, options];
    };
  },
  loader<Initial, State>(
    id: string,
    loader: () => Promise<State>,
    initial: Initial,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: unknown[]
  ): LoaderReturn<Initial, State> {
    const loaders = useContext(Loader);
    const data = [...loaders].find((loader) => loader.id === id);

    if (data) {
      return {
        data: data.value,
        loading: false,
        error: null,
      } as LoaderReturn<Initial, State>;
    }

    const value = loader();
    loaders.add({ id, value });

    return {
      data: initial,
      loading: true,
      error: null,
    } as LoaderReturn<Initial, State>;
  },
};
