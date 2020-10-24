import { terser } from 'rollup-plugin-terser';

module.exports = {
    input: 'src/index.js',
    external: [],
    output: {
        file: 'es/index.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
    },
    plugins: [terser()],
};
