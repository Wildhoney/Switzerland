const webpack = require('webpack');

module.exports = {
    entry: {
        './example/js/components/todo-manager/js/build': ['babel-polyfill', './example/js/components/todo-manager/js/default.js'],
        './example/js/components/iss-position/js/build': ['babel-polyfill', './example/js/components/iss-position/js/default.js']
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['envify-loader', 'babel-loader'],
                exclude: /node_modules/i
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
};
