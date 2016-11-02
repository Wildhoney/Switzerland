const webpack = require('webpack');

module.exports = {
    entry: {
        './example/js/components/todo-manager/js/build': ['./example/js/components/todo-manager/js/default.js']
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['envify-loader', 'babel-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
};
