const webpack = require('webpack');

module.exports = {
    entry: {
        './example/js/components/iss-position/build': ['./example/js/components/iss-position/js/default.js'],
        './example/js/components/iss-position/worker': ['./example/js/components/iss-position/js/worker.js']
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
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
};
