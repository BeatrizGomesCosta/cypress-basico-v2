
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').should('be.visible').type('Beatriz').should('have.value', 'Beatriz')
    cy.get('#lastName').should('be.visible').type('Gomes Costa').should('have.value', 'Gomes Costa')
    cy.get('#email').should('be.visible').type('beatrizgcx@gmail.com').should('have.value', 'beatrizgcx@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('teste').should('have.value', 'teste')
    cy.contains('button', 'Enviar').click()
    
})

