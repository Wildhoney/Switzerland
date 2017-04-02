import parsePath from 'path-parse';
import { error } from '../helpers/messages';

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
    const path = file => `${scriptPath}/${file}`;

    /**
     * @method toString
     * @return {String}
     */
    path.toString = () => scriptPath;

    return path;

})();
