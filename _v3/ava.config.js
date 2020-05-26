export default {
    failFast: true,
    files: ['src/**/__tests__/**.js'],
    require: ['esm', './tests/helpers/browser-env.js'],
    babel: {
        testOptions: {
            plugins: ['@babel/plugin-syntax-import-meta'],
        },
    },
};
