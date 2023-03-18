export type Args = {
  path: string;
  provider?: Provider;
  includeSwitzerland?: boolean;
};

export type Provider =
  | "jspm.io"
  | "jspm.io#system"
  | "skypack"
  | "jsdelivr"
  | "unpkg"
  | "esm.sh"
  | "deno"
  | "denoland";
