import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';
import parser from '@babel/parser';
import generator from '@babel/generator';

function main() {
    const files = glob.sync('./src/**/**.js').filter((a) => !a.includes('__tests__'));

    return files.map(async (input) => {
        const data = fs.readFileSync(input, 'utf-8');
        const outputProduction = input.replace('./src', './es/production');
        const outputDevelopment = input.replace('./src', './es/development');

        await mkdirp(path.parse(outputProduction).dir);

        const ast = parser.parse(data, { sourceType: 'module' });
        const { code } = generator.default(ast, { minified: true, comments: false, compact: true });

        code && fs.writeFileSync(outputProduction, code);
        await mkdirp(path.parse(outputDevelopment).dir);
        fs.copyFile(input, outputDevelopment, () => {});
    });
}

main();
