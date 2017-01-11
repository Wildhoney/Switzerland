var webpack = require('webpack');

module.exports = {
    entry: {
        switzerland: ['./src/switzerland.js'],
        middleware: ['./src/middleware.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: 'switzerland',
        libraryTarget: 'commonjs2'
    },
    externals: {
        axios: 'axios',
        ramda: 'ramda'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common')
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/i
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
};
