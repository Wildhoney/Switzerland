import { VNode } from "preact";

export type SwissAttrs = Record<string, unknown>;

// export type SwissAttrs<Attrs extends SwissAttrsGeneric> = {
//   attrs: {
//     [K in keyof Attrs]: Attrs[K] extends string ? Attrs[K] : string;
//   };
//   error: null | Error;
// };

export type SwissTree<Attrs extends SwissAttrs> = (args: {
  attrs: Attrs;
  error: null | Error;
}) => VNode;

export type SwissEvent<AttrKeys> = AttrKeys extends `on${infer E}` ? E : never;

export type DispatchEventPayload = Record<string, unknown>;

export type DispatchEventOptions = Record<string, unknown>;
