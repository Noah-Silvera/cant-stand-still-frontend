/// <reference types="cypress" />

context('Riders index page', () => {
  beforeEach(() => {
    cy.visit('/riders')
  })

  it('displays the name of each rider', () => {
    cy.contains('Noah Silvera')
    cy.contains('Saskia Kowalik')
  })
})
