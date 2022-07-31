describe('app', () => {
    it('should be able to add and remove a todo items', () => {
        cy.visit('http://localhost:3000');
        cy.get('input').type('Adam');
        cy.get('button[data-qa="add"]').click();
        cy.get('ul[data-qa="items"] li p').eq(0).should('have.text', 'Adam');

        cy.get('input').type('Maria');
        cy.get('button[data-qa="add"]').click();
        cy.get('ul[data-qa="items"] li p').eq(1).should('have.text', 'Maria');

        cy.get('input').type('Imogen');
        cy.get('button[data-qa="add"]').click();
        cy.get('ul[data-qa="items"] li p').eq(2).should('have.text', 'Imogen');

        cy.get('button[data-qa="delete"]').eq(1).click();
        cy.get('ul[data-qa="items"] li p').eq(0).should('have.text', 'Adam');
        cy.get('ul[data-qa="items"] li p').eq(1).should('have.text', 'Imogen');
    });
});
