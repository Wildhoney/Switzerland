const webpack = require('webpack');

module.exports = {
    entry: {
        './example/components/iss-position/build.js': ['./example/components/iss-position/default.js'],
        './example/vendor.js': ['./src/switzerland']
    },
    output: {
        filename: '[name]',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['envify-loader', 'babel-loader', 'virtual-dom?jsx=element']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('./example/vendor')
    ]
};
