import {
  DispatchEventOptions,
  DispatchEventPayload,
  SwissAttrs,
  SwissEvent,
} from "../../global/types/index.js";
import { toCamelcase } from "../../global/utils/index.js";

export const serialiseAttributes = JSON.stringify;

export function getAttributes<Attrs extends SwissAttrs>(
  attrs: NamedNodeMap
): Attrs {
  return Object.values(attrs).reduce((attrs, attr) => {
    const name = toCamelcase(attr.nodeName).fromKebab();

    return {
      ...attrs,
      [name]: attr.nodeValue,
    };
  }, {} as Attrs);
}

export function hasApplicableMutations(
  node: HTMLElement,
  mutations: MutationRecord[]
): boolean {
  return mutations.some((mutation) => {
    const { attributeName, oldValue } = mutation;
    return attributeName
      ? oldValue !== node.getAttribute(attributeName)
      : false;
  });
}

export function dispatchEvent<Attrs>(node: HTMLElement) {
  return (
    name: Attrs extends SwissAttrs ? SwissEvent<keyof Attrs> : string,
    payload: DispatchEventPayload,
    options: DispatchEventOptions = {}
  ) => {
    const model = typeof payload === "object" ? payload : { value: payload };

    return node.dispatchEvent(
      new CustomEvent(name as string, {
        bubbles: true,
        composed: true,
        ...options,
        detail: { ...model, version: 6 },
      })
    );
  };
}

export function attachShadow(node: HTMLElement): HTMLElement | ShadowRoot {
  if (node.shadowRoot) return node.shadowRoot;

  try {
    return node.attachShadow({ mode: "open" });
  } catch {
    return node;
  }
}
