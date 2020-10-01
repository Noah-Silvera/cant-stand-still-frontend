/// <reference types="cypress" />

context('Riders index page', () => {
  beforeEach(() => {
    cy.visit('/riders')
  })

  it('displays the name of each rider', () => {
    cy.get('.rider-info')
      .contains('Rider: Noah Silvera')
      .next()
      .contains('Rider: Saskia Kowalik')
  })
})
