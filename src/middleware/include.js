import { difference, identity, memoize, groupBy } from 'ramda';
import { get as fetch } from 'axios';
import { path } from '../helpers/path';

/**
 * @constant includes
 * @type {WeakMap}
 */
const includes = new WeakMap();

/**
 * @constant includeMap
 * @type {Object}
 */
const includeMap = [
    { extensions: ['js'], tag: 'script', attrs: { type: 'text/javascript' }},
    { extensions: ['css'], tag: 'style', attrs: { type: 'text/css' }}
];

/**
 * @method fetchInclude
 * @param {String} document
 * @return {Promise}
 */
const fetchInclude = memoize(document => {

    return new Promise(resolve => {
        fetch(document).then(response => response.data).then(resolve).catch(() => resolve(''));
    });

});

/**
 * @method attach
 * @param files {Array|String}
 * @return {Promise}
 */
const attach = files => {

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

            // Concatenate all of the content from the documents, and replace any $path instances
            // with the path of the component.
            const content = fileData.reduce((acc, fileDatum) => `${acc} ${fileDatum}`).trim();
            containerNode.innerHTML = content.replace(/\$path/ig, path);

            return containerNode.innerHTML.length ? containerNode : null;

        });

    });

    return Promise.all(mappedFiles);

};

/**
 * @param {Array|String} attachFiles
 * @return {Function}
 */
export default (...attachFiles) => {

    const files = Array.isArray(attachFiles) ? attachFiles : [attachFiles];

    return props => {

        const { node } = props;

        const addedFiles = (() => {

            if (node.isConnected) {

                const boundary = props.node.shadowRoot;

                const hasCurrent = includes.has(node);
                !hasCurrent && includes.set(node, []);
                const current = includes.get(node);

                // We don't want to load the same files again, so we'll see what was previously loaded.
                const addedFiles = difference(files, current);

                // Memorise the current set of files.
                includes.set(node, files);

                if (addedFiles.length) {

                    props.node.classList.add('resolving');
                    props.node.classList.remove('resolved');

                    attach(addedFiles).then(nodes => {

                        // Remove any `null` values which means the content of the file was empty, and then append
                        // them to the component's shadow boundary.
                        nodes.filter(identity).forEach(node => boundary.appendChild(node));

                        props.node.classList.add('resolved');
                        props.node.classList.remove('resolving');

                    });

                }

                return addedFiles;

            }

            return [];

        })();

        return { ...props, files: addedFiles };

    };

};
