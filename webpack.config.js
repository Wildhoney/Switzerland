const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
});

const uglifyPlugin = new UglifyPlugin({
    uglifyOptions: {
        ecma: 8
    }
});

module.exports = {
    entry: {
        'core.js': ['./src/switzerland.js', './src/middleware.js'],
        './example/js/todo-app/build.js': './example/js/todo-app/index.js'
    },
    output: {
        filename: '[name]',
        libraryTarget: 'var'
    },
    node: {
        fs: 'empty'
    },
    plugins: process.env.NODE_ENV === 'production' ? [definePlugin, uglifyPlugin] : [definePlugin],
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