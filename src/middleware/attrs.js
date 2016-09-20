export default ({ element }) => {

    const attrs = Object.keys(element.attributes).reduce((acc, index) => {
        const model = element.attributes[index];
        return { ...acc, [model.nodeName]: model.nodeValue };
    }, {});

    return { element, attrs };

};
