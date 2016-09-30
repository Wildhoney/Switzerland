const webpack = require('webpack');

module.exports = {
    entry: {
        switzerland: ['./src/switzerland.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'switzerland.browser.js',
        library: 'switzerland',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader']
            }
        ]
    }
};
