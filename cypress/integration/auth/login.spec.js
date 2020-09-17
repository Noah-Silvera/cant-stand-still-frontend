/// <reference types="cypress" />

context('Login', () => {
  it('displays an alert with the logged in user id', () => {
    cy.window().specWindow.SERVER_HOST = 'http://localhost:3005'
    cy.server()
    cy.route({
      method: 'POST',
      url: '/login',
      response: {
        id: 1
      }
    })
    cy.on('window:alert', (message) => {
      expect(message).to.equal(1)
    })
    cy.visit('/?state=&code=0a519f3357fc284f7e68ab916ecc167719b0449c&scope=read,activity:read')
  })
})
