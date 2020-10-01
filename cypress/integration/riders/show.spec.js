/// <reference types="cypress" />

context('Riders show page', () => {

  it('displays the name of the rider', () => {
    cy.visit('/riders/1')
    cy.get('.rider-info')
      .first()
      .contains('Noah Silvera')

    cy.visit('/riders/2')
    cy.get('.rider-info')
      .first()
      .contains('Saskia Kowalik')
  })
})
