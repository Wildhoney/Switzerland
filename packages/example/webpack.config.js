const path = require('path');
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
    mode: 'production',
    entry: {
        './src/js/build.js': ['@babel/polyfill', './src/js/index.js']
    },
    output: {
        filename: '[name]',
        path: path.resolve('./'),
        libraryTarget: 'var'
    },
    plugins: [definePlugin, uglifyPlugin],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/i,
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        require('@babel/plugin-proposal-object-rest-spread'),
                        [
                            require('@babel/plugin-transform-react-jsx'),
                            {
                                pragma: 'html.h'
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    }
};
