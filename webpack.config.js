const webpack = require('webpack');

module.exports = {
    entry: './example/index.js',
    output: {
        filename: 'build.js',
        libraryTarget: 'var'
    },
    node: {
        fs: 'empty'
    },
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