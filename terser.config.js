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
        const output = input.replace('./src', './es');
        mkdirp(path.parse(output).dir, () => {
            fs.writeFileSync(
                output,
                terser.minify(data, { ecma: 8, module: true }).code
            );
        });
    });
}

main();
