import { create, h, m } from "../../src";

export default create(
  "x-profile",
  m.html(() => {
    return h("div", {}, ["Hi Adam!"]);
  })
);
