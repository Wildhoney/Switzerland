module.exports = {
    presets: [['@babel/env']],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        [
            '@babel/plugin-transform-react-jsx',
            {
                pragma: 'html.h'
            }
        ]
    ]
};
