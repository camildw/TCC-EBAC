Cypress.Commands.add('login', (email, password) => {
  cy.visit('/minha-conta');
  cy.get('#username').type(email);
  cy.get('#password').type(password, { log: false });
  cy.get('.woocommerce-form-login__submit').click();
  cy.url().should('include', '/minha-conta');
});

