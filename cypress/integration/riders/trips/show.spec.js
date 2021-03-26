/// <reference types="cypress" />

context('Trips show page', () => {

  it('displays the name of the trip', () => {
    cy.visit('/riders/1/trips/1')
    cy.contains('Past Bike Trip')

    cy.visit('/riders/1/trips/2')
    cy.contains('Current Bike Trip')
  })
})
