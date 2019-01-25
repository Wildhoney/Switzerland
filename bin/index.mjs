#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import * as R from 'ramda';
import capitalise from 'capitalize';
import makeDir from 'mkdirp';
import copyDir from 'copy-dir';
import glob from 'glob';
import fmt from 'string-template';
import minimist from 'minimist';
import humps from 'humps';
import * as theme from './theme.mjs';

const argv = minimist(process.argv.slice(2));
const cwd = path.dirname(new URL(import.meta.url).pathname);
const pkg = JSON.parse(
    fs.readFileSync(path.resolve(`${cwd}/../package.json`), 'utf8')
);
const sourceDir = path.resolve(cwd, 'template');
const targetDir = path.resolve(cwd, '..', process.argv[2]);
const name = path.basename(argv._[0] || '');
const model = {
    name: argv.name || name,
    version: pkg.version,
    testRunner: 'ava',
    ...humps.camelizeKeys(R.omit(['_'], argv))
};

async function main() {
    figlet(capitalise(pkg.name), { font: 'univers' }, (_, data) => {
        data && console.log(chalk.gray(data));

        console.log(
            chalk.gray('Version:'.padStart(data ? 115 : 0)),
            pkg.version,
            '\n\n'
        );

        try {
            if (fs.existsSync(targetDir) && !argv.overwrite) {
                throw new Error(
                    `${name} already exists in location, use '--overwrite'.`
                );
            }

            if (!name) {
                throw new Error('You must specify a name for the node.');
            }

            makeDir.sync(targetDir);
            copyDir.sync(sourceDir, targetDir);
            glob.sync(`${targetDir}/**/*.{js,css}`).forEach(file => {
                const content = fmt(fs.readFileSync(file, 'utf8'), model);
                fs.writeFileSync(file, content);
            });

            return void console.log(
                theme.status(theme.statusType.success)(' Created '),
                theme.separator(':'),
                theme.message(model.name),
                '\n'
            );
        } catch (error) {
            return void console.log(
                theme.status(theme.statusType.error)(' Failed '),
                theme.separator(':'),
                theme.message(error.message),
                '\n'
            );
        }
    });
}

main();