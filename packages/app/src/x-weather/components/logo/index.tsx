import { use, node, VNode } from "lausanne";

export default function Logo(): VNode {
  const path = use.path(import.meta.url);

  return (
    <>
      <a class="logo" href="https://github.com/wildhoney/switzerland">
        <img
          src={path("../../../../src/x-weather/images/logo.png")}
          alt="Switzerland"
        />
      </a>

      <node.StyleSheet
        href={path("../../../../src/x-weather/components/logo/styles.css")}
      />
    </>
  );
}
