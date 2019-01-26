import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

export default {
    input: "./bin/backup.mjs",
    output: {
        file: "bin/index.js",
        format: "cjs",
        banner: '#!/usr/bin/env node'
    },
    plugins: [
        replace({
            delimiters: ['', ''],
            '#!/usr/bin/env node': ''
        }),babel({
            exclude: 'node_modules/**'
          })
    ]
};
