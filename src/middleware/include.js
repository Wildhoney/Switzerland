import { identity, memoize, groupBy } from 'ramda';
import { get as fetch } from 'axios';
import parseUrls from 'css-url-parser';
import parsePath from 'path-parse';
import escapeRegExp from 'escape-string-regexp';
import once, { options } from './once';

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
        fetch(file).then(response => transformPaths(response.data)).then(resolve).catch(() => resolve(''));
    });

});

/**
 * @method fetchIncludes
 * @param {Array} files
 * @return {Promise}
 */
const fetchIncludes = files => {

    // Group all of the files by their extension.
    const groupedFiles = groupBy(file => file.extension)(files.map(path => ({ path, extension: path.split('.').pop() })));

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
 * @param props {Object}
 * @return {void}
 */
const attachFiles = once(props => {

    const { node, files } = props;
    const boundary = node.shadowRoot;

    if (files.length) {

        node.classList.add('resolving');
        node.classList.remove('resolved');

        fetchIncludes(files).then(nodes => {

            // Remove any `null` values which means the content of the file was empty, and then append
            // them to the component's shadow boundary.
            nodes.filter(identity).forEach(node => boundary.appendChild(node));

            node.classList.add('resolved');
            node.classList.remove('resolving');

        });

    }

}, options.RESET);

/**
 * @param {Array|String} files
 * @return {Function}
 */
export default (...files) => {

    return props => {

        // Attach the documents using the `once` middleware.
        attachFiles({ ...props, files: Array.isArray(files) ? files : [files] });

        return props;

    };

};
