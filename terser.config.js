const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const terser = require('terser');

function main() {
    const files = glob
        .sync('./src/**/**.js')
        .filter(a => !a.includes('__tests__'));

    files.forEach(input => {
        const data = fs.readFileSync(input, 'utf-8');
        const outputProduction = input.replace('./src', './es/production');
        const outputDevelopment = input.replace('./src', './es/development');

        mkdirp(path.parse(outputProduction).dir, () => {
            fs.writeFileSync(
                outputProduction,
                terser.minify(data, { ecma: 8, module: true }).code
            );
        });

        mkdirp(path.parse(outputDevelopment).dir, () => {
            fs.copyFile(input, outputDevelopment, () => {});
        });
    });
}

main();
