import chalk from 'chalk';

export const statusType = {
    success: Symbol('success'),
    failure: Symbol('failure'),
};

export const status = (type) => (type === statusType.success ? chalk.bgGreen : chalk.bgRedBright);

export const separator = chalk.gray;

export const message = chalk.whiteBright;
