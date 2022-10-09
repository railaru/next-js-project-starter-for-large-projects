// cypress/integration/app.spec.js

import { E2E_TEST_DOM_ELEMENTS } from '../../constants/e2e';

describe('Example', () => {
  it('should navigate to the example page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link for examples pages and click it
    cy.get(`[data-test*="${E2E_TEST_DOM_ELEMENTS.EXAMPLES_LINK}"]`).click();

    // Find an example form
    cy.get(`[data-test*="${E2E_TEST_DOM_ELEMENTS.EXAMPLE_FORM}"]`);
  });
});
