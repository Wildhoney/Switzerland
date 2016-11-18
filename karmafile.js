module.exports = function(options) {

    let config = {
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'example/js/components/iss-position/js/build.js',
            'tests/karma/*.test.js'
        ],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        reporters: ['progress'],
        port: 9876,
        singleRun: false,
        colors: true,
        logLevel: options.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome']
    };

    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }

    options.set(config);

};
