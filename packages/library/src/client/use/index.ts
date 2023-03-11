import { useContext, useMemo, useRef } from "preact/hooks";
import { Env, use as baseUse } from "../../global/use/index.js";
import { LoaderResponse } from "../../global/use/types.js";
import { dispatchEvent } from "../create/utils.js";

export const use = {
  ...baseUse,
  path(componentUrl: string): (resourcePath: string) => string {
    return (resourcePath: string): string => {
      return new URL(resourcePath, componentUrl).href;
    };
  },
  dispatch<Attrs>() {
    const env = useContext(Env);
    return useMemo(
      () => env.node instanceof HTMLElement && dispatchEvent<Attrs>(env.node),
      [env.node]
    );
  },
  loader<Initial, State>(
    id: string,
    loader: () => Promise<State>,
    initial: Initial,
    deps: unknown[]
  ): LoaderResponse<Initial, State> {
    const preload = globalThis.swissData
      .flat()
      .find((datum: { id: string }) => datum.id === id);

    const isFirstRender = useRef<boolean>(true);
    const [data, setData] = use.state<Initial | State>(
      (preload?.value as State) ?? initial
    );
    const [loading, setLoading] = use.state<boolean>(false);
    const [error, setError] = use.state<null | Error>(null);

    use.effect(() => {
      if (preload && isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      isFirstRender.current = false;
      setLoading(true);

      loader()
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, deps);

    return { data, loading, error } as LoaderResponse<Initial, State>;
  },
};
