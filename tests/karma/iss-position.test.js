// import MockAdapter from 'axios-mock-adapter';

describe('iss-position', () => {

    it('Should be able to render the iss-position node', done => {

        const node = document.createElement('iss-position');
        document.body.appendChild(node);

        setTimeout(() => {

            const sectionNode = node.shadowRoot.querySelector('section');
            const imgNode = sectionNode.querySelector('img.loading');
            const buttonNode = sectionNode.querySelector('button');

            expect(document.querySelectorAll('iss-position').length).toBe(1);
            expect(sectionNode instanceof HTMLElement).toBeTruthy();
            expect(imgNode instanceof HTMLImageElement).toBeTruthy();
            expect(buttonNode instanceof HTMLButtonElement).toBeTruthy();

            expect(1).toBe(1);
            done();

        });

    });

});
