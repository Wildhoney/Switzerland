export default ({ element }) => {

    const attrs = Object.keys(element.attributes).map((model, index) => {

        return { ...model };

        // element.attributes

    }, {});

    return { element, attrs };

};
