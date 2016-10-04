const webpack = require('webpack');

module.exports = {
    entry: {
        './example/js/components/iss-position/build': ['./example/js/components/iss-position/default.js'],
        './example/js/vendor': ['./src/switzerland']
    },
    output: {
        filename: '[name].js',
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
        new webpack.optimize.CommonsChunkPlugin('./example/js/vendor.js')
    ]
};
