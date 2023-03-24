type ImportMap = {
  imports?: Record<string, string>;
  scopes?: {
    [scope: string]: Record<string, string>;
  };
};

export type Args = {
  path: string;
  provider?: Provider;
  excludeDependencies?: string[];
  inputMap?: ImportMap;
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
