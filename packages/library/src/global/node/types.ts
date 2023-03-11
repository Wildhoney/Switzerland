export type StyleSheetProps = {
  href: string;
  media?: string;
};

export type VariablesProps = Record<string, boolean | number | string> & {
  container?: string;
};
