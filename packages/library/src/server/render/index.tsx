import { Env } from "../../global/use/index.js";
import { EnvContext } from "../../global/use/types.js";
import { Loaders, RenderOptions } from "./types.js";
import { VNode, createContext } from "preact";
import { renderToString } from "preact-render-to-string";

export const Loader = createContext<Set<Loaders>>(new Set());

const serverOptions = {
  node: null,
  isServer: true,
  isClient: false,
} satisfies Partial<EnvContext>;

export async function render(
  App: VNode,
  options: RenderOptions = { path: null, root: null }
): Promise<string> {
  const loaders = new Set<Loaders>();

  const tree = renderToString(
    <Loader.Provider value={loaders}>
      <Env.Provider value={{ ...options, ...serverOptions }}>
        {App}
      </Env.Provider>
    </Loader.Provider>,
    {},
    { pretty: true }
  );

  if (loaders.size === 0) {
    return tree;
  }

  const data = new Set(
    await Promise.all(
      [...loaders].map(async (loader) => {
        const value = await loader.value;
        return { ...loader, value };
      })
    )
  );

  return renderToString(
    <>
      <Loader.Provider value={data}>
        <Env.Provider value={{ ...options, ...serverOptions }}>
          {App}
        </Env.Provider>
      </Loader.Provider>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            const data = globalThis.swissData ? [...globalThis.swissData] : [];
            data.push(${JSON.stringify([...data])});
            globalThis.swissData = data;
          `,
        }}
      />
    </>,
    {},
    { pretty: true }
  );
}
