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