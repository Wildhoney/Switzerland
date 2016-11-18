describe('iss-position', () => {

    it('Should be able to render the iss-position node', done => {

        const node = document.createElement('iss-position');
        document.body.appendChild(node);

        setTimeout(() => {

            const sectionNode = node.shadowRoot.querySelector('section');
            const labelNode = sectionNode.querySelector('label.error');
            const buttonNode = sectionNode.querySelector('button');

            expect(document.querySelectorAll('iss-position').length).toBe(1);
            expect(sectionNode instanceof HTMLElement).toBeTruthy();
            expect(labelNode instanceof HTMLLabelElement).toBeTruthy();
            expect(buttonNode instanceof HTMLButtonElement).toBeTruthy();

            done();

        }, 2000);

    });

});
