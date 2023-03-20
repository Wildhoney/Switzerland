import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.client.tsx",
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [typescript(), terser()],
};
