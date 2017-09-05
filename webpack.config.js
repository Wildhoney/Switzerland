const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './tests/mocks/welcome-card/index.js',
    output: {
        filename: './tests/mocks/welcome-card/build.js',
        libraryTarget: 'var'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new Uglify({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                mangle: true,
                output: {
                    comments: false,
                    beautify: false
                },
                parse: {
                    html5_comments: false,
                    shebang: false
                },
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/i
            }
        ]
    }
};