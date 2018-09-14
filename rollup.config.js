import fs from 'fs';
import { terser } from 'rollup-plugin-terser';

const config = (input, output = input) => ({
    input: `src/${input}`,
    output: { format: 'es', file: `es/${output}` },
    plugins: [terser()]
});

const middleware = fs
    .readdirSync('./src/middleware')
    .filter(name => fs.lstatSync(`./src/middleware/${name}`).isDirectory())
    .map(name => config(`middleware/${name}/index.js`, `${name}/index.js`));

export default [config('index.js'), ...middleware];
