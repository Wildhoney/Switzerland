module.exports = {
    entry: {
        businessCard: ['./example/components/business-card/default.js']
    },
    output: {
        path: __dirname + '/example',
        filename: 'build.js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'virtual-dom?jsx=element']
            }
        ]
    }
};
