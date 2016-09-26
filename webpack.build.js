module.exports = {
    entry: {
        switzerland: ['./src/switzerland.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: 'switzerland',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'axios': true,
        'ramda': true
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
