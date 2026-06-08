describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  it('demo', function() {
    cy.visit('https://the-internet.herokuapp.com/login')
    
    cy.get('[name="username"]').click();
    cy.get('[name="username"]').type('tomsmith');
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('SuperSecretPassword!');
    cy.get('#login button.radius').click();
    cy.get('#flash').click();
    cy.get('#flash').should('have.text', '\n            You logged into a secure area!\n            ×\n          ');
    
  });
})