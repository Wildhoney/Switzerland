module.exports = {
    entry: {
        switzerland: ['babel-polyfill', './src/switzerland.js'],
        middleware: ['./src/middleware.js'],
        components: ['./src/components.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: 'switzerland',
        libraryTarget: 'commonjs2'
    },
    externals: {
        axios: true,
        director: true,
        'promised-pipe': true,
        ramda: true
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
