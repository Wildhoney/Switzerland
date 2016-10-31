module.exports = {
    entry: {
        switzerland: ['./src/switzerland.js'],
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
        ramda: true,
        'promised-pipe': true
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
