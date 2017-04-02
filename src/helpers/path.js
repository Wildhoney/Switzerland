import parsePath from 'path-parse';

/**
 * @constant scriptPath
 * @return {String}
 */
const scriptPath = (() => {

    try {
        return parsePath(document.currentScript.getAttribute('src')).dir;
    } catch (err) {}

    try {
        return parsePath(self.location.href).dir;
    } catch (err) {}

    return '';

})();

export default (() => {

    /**
     * @method path
     * @param {String} file
     * @return {String}
     */
    const path = file => `${scriptPath}/${file.replace(/^\/\//i, '')}`;

    /**
     * @method toString
     * @return {String}
     */
    path.toString = () => scriptPath;

    return path;

})();
