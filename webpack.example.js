module.exports = {
    entry: {
        iss: ['./example/components/iss-position/default.js']
    },
    output: {
        path: __dirname + '/example/components/iss-position',
        filename: 'build.js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['envify-loader', 'babel-loader', 'virtual-dom?jsx=element']
            }
        ]
    }
};
