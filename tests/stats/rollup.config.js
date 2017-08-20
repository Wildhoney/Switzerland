import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { minify } from 'uglify-es';

export default {
    format: 'iife',
    moduleName: 'test',
    plugins: [
        async(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.NODE_UNIQUE_ID': JSON.stringify(0),
        }),
        babel(),
        commonjs({
            namedExports : {
                'virtual-dom/index.js' : ['h'],
                'node_modules/humps/humps.js' : ['camelize', 'decamelize'],
                'node_modules/prop-types/lib/index.js': ['validate'],
                'node_modules/shortid/index.js': ['generate']
            }
        }),
        nodeResolve({ jsnext: true, main: true }),
        uglify({}, minify)
    ]
};
