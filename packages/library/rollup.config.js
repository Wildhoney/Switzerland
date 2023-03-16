import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "./src/index.client.tsx",
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [typescript(), terser()],
};
