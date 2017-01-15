import { VNode, VText } from 'virtual-dom-webcomponents-patch';
import transformer from 'html-to-vdom';
import once from './once';

/**
 * @param {Object} props
 * @return {Object}
 */
export default once(props => {

    const html = props.node.innerHTML.trim();
    const children = transformer({ VNode, VText })({
        getVNodeKey: attributes => attributes.id
    }, html);

    return { ...props, children };

});
