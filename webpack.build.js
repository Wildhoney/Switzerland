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
        director: 'director',
        ramda: 'ramda',
        'promised-pipe': 'promised-pipe'
    },
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
