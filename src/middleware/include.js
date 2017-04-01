import memoize from 'ramda/src/memoize';
import groupBy from 'ramda/src/groupBy';
import identity from 'ramda/src/identity';
import parseUrls from 'css-url-parser';
import parsePath from 'path-parse';
import escapeRegExp from 'escape-string-regexp';
import options from '../helpers/options';
import { coreKey } from '../helpers/keys';
import once from './once';

/**
 * @constant includeMap
 * @type {Object}
 */
const includeMap = [
    { extensions: ['js'], tag: 'script', attrs: { type: 'text/javascript' } },
    { extensions: ['css'], tag: 'style', attrs: { type: 'text/css' } }
];

/**
 * @method fetchInclude
 * @param {String} file
 * @return {Promise}
 */
const fetchInclude = memoize(file => {

    const cssPath = parsePath(file).dir;

    const transformPaths = content => {

        const urls = parseUrls(content);

        // Update the URLs to make them relative to the CSS document.
        return urls.length ? urls.map(url => {
            const replacer = new RegExp(escapeRegExp(url), 'ig');
            return content.replace(replacer, `${cssPath}/${url}`);
        }).toString() : content;

    };

    return new Promise(resolve => {

        global.fetch(file).then(response => response.text())
                          .then(response => transformPaths(response))
                          .then(resolve)
                          .catch(() => resolve(''));

    });

});

/**
 * @method ext
 * @param {String} path
 * @return {Object}
 */
const ext = path => {
    return { path, extension: path.split('.').pop() };
};

/**
 * @method fetchIncludes
 * @param {Array} files
 * @return {Promise}
 */
const fetchIncludes = files => {

    // Group all of the files by their extension.
    const groupedFiles = groupBy(file => file.extension)(files.map(ext));

    const mappedFiles = Object.keys(groupedFiles).map(extension => {

        const nodeData = includeMap.find(model => model.extensions.includes(extension));
        const files = groupedFiles[extension].map(model => model.path);
        const containerNode = document.createElement(nodeData.tag);

        // Apply all of the attributes defined in the `includeMap` to the node.
        Object.keys(nodeData.attrs).map(key => containerNode.setAttribute(key, nodeData.attrs[key]));

        // Load each file individually and then concatenate them.
        return Promise.all(files.map(fetchInclude)).then(fileData => {

            // Concatenate all of the content from the documents.
            containerNode.innerHTML = fileData.reduce((acc, fileDatum) => `${acc} ${fileDatum}`).trim();
            return containerNode.innerHTML.length ? containerNode : null;

        });

    });

    return Promise.all(mappedFiles);

};

/**
 * @method attachFiles
 * @param flags {Number}
 * @return {Function}
 */
const attachFiles = flags => once(props => {

    return new Promise(resolve => {

        const { node, files } = props;
        const boundary = node.shadowRoot;

        if (files.length !== 0) {

            if (flags & options.ASYNC) {
                node.classList.add('styling');
                node.classList.remove('styled');
            }

            fetchIncludes(files).then(nodes => {

                // Remove any `null` values which means the content of the file was empty, and then append
                // them to the component's shadow boundary.
                nodes.filter(identity).forEach(node => boundary.appendChild(node));

                if (flags & options.ASYNC) {
                    node.classList.add('styled');
                    node.classList.remove('styling');
                }

                resolve();

            });

        }

    });

}, options.RESET);

/**
 * @method mergeStylesInto
 * @param {String[]|String} files
 * @return {Function}
 */
const mergeStylesInto = files => {

    const axios = require('axios');

    return async props => {

        const cssFiles = await Promise.all(files.filter(file => ext(file).extension === 'css').map(async file => {
            const response = await axios.get(file);
            return response.data;
        }));

        return { ...props, [coreKey]: { ...props[coreKey], css: cssFiles.join('\n') } };

    };

};

/**
 * @param {String[]|String} files
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */
export default (files, flags = options.DEFAULT) => {

    const attach = attachFiles(flags);
    const merge = mergeStylesInto([].concat(files));

    return props => {

        return props.universal ? merge(props) : do {

            // Attach the documents using the `once` middleware.
            const attached = attach({ ...props, files: [].concat(files) });
            flags & options.ASYNC ? props : attached.then(() => props);

        };

    };

};
