import { EnvContext } from "../../global/use/types.js";

export type Loaders = { id: string; value: Promise<unknown> | unknown };

export type RenderOptions = Omit<EnvContext, "node" | "isServer" | "isClient">;
