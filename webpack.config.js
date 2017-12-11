const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'core.js': './src/switzerland.js',
        './example/js/todo-app/build.js': './example/js/todo-app/index.js'
    },
    output: {
        filename: '[name]',
        libraryTarget: 'var'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyPlugin({
            uglifyOptions: {
                ecma: 8
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