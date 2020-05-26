import fs from 'fs';
import path from 'path';
import changeCase from 'change-case';
import Cryptr from 'cryptr';
import shortId from 'shortid';

export const cryptr = new Cryptr(shortId.generate());

const transformations = [{ from: 'Guinea Bissau', to: 'Guinea-Bissau' }];

const exceptions = (name) => {
    const model = transformations.find((item) => item.from === name);
    return model ? model.to : name;
};

/**
 * @function isImage
 * @param {String} filename
 * @return {Boolean}
 */
const isImage = (filename) => /svg$/i.test(filename);

/**
 * @function fetch
 * @return {Array}
 */
export const fetch = () => {
    return fs
        .readdirSync(`./example/app/nodes/flag-app/images/flags`)
        .filter(isImage)
        .map((filename) => ({
            name: exceptions(changeCase.titleCase(path.parse(filename).name)),
            flag: `${cryptr.encrypt(filename)}.svg`,
        }));
};
