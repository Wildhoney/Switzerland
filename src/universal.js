import { coreKey } from './helpers/keys';

/**
 * @method render
 * @param {Object} component
 * @return {String}
 */
export const render = async component => {
    const result = await component.connected(true);
    return result.value[coreKey].root;
};
