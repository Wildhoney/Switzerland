import chalk from 'chalk';

export const statusType = {
    success: Symbol('success'),
    failure: Symbol('failure')
};

export const status = type =>
    type === statusType.success ? chalk.bgGreen : chalk.bgRedBright;

export const separator = chalk.gray;

export const label = chalk.underline.white;

export const value = chalk.redBright;

export const message = chalk.whiteBright;
