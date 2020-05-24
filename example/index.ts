import { render } from "../src";

export async function main() {
  const html = await render(Layout);
  console.log(html);
}
