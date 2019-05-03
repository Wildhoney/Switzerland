export default {
    failFast: true,
    require: ['esm', 'node-url-imports', 'core-js', './tests/helpers/browser-env.js'],
    babel: {
        testOptions: {
            plugins: ['@babel/plugin-syntax-import-meta']
        }
    }
};
