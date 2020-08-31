/// <reference types="cypress" />

context('Riders index page', () => {
  beforeEach(() => {
    cy.visit('/riders')
  })

  it('displays the email of each rider', () => {
    cy.get('.rider-info')
      .first()
      .contains('Rider: noah.a.silvera@gmail.com')
  })
})
