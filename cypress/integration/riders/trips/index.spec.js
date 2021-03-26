/// <reference types="cypress" />

context('Trips index page', () => {

  it('displays the name of the trips', () => {
    cy.visit('/riders/1/trips/')
    cy.contains('Past Bike Trip')
    cy.contains('Current Bike Trip')
  })
})
