import fs from 'fs';
import glob from 'glob';
import mkdirp from 'mkdirp';
import path from 'path';
import terser from 'terser';

function main() {
    const files = glob.sync('./src/**/**.js').filter((a) => !a.includes('__tests__'));

    return files.map(async (input) => {
        const data = fs.readFileSync(input, 'utf-8');
        const outputProduction = input.replace('./src', './es/production');
        const outputDevelopment = input.replace('./src', './es/development');

        await mkdirp(path.parse(outputProduction).dir);

        fs.writeFileSync(
            outputProduction,
            terser.minify(data, {
                ecma: 8,
                module: true,
                compress: {
                    passes: 2,
                },
            }).code
        );

        await mkdirp(path.parse(outputDevelopment).dir);

        fs.copyFile(input, outputDevelopment, () => {});
    });
}

main();
