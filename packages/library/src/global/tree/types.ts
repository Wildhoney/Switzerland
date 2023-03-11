export type State = { error: null | Error };

export type Props<Attrs> = {
  attrs: Attrs;
  error: null | Error;
};
