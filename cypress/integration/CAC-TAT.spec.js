/// <reference types="Cypress" />

//const { functionsIn } = require("cypress/types/lodash")

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit ('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const TextoLongo = 'É Halloween e chove muito em Gotham: O Batman de Robert Pattinson tem estreia memorável em filme noir que dá pontapé ao novo Bat-Verso do cinema e da TV; estreia em 3 de março no Brasil'
        cy.get('#firstName').should('be.visible').type('Beatriz').should('have.value', 'Beatriz')
        cy.get('#lastName').should('be.visible').type('Gomes Costa').should('have.value', 'Gomes Costa')
        cy.get('#email').should('be.visible').type('beatrizgcx@gmail.com').should('have.value', 'beatrizgcx@gmail.com')
        cy.get('#open-text-area').should('be.visible').type(TextoLongo, {delay: 0}).should('have.value', TextoLongo)
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    //Exercício extra 1: Utilização do delay

    //Exercício extra 2

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').should('be.visible').type('Beatriz').should('have.value', 'Beatriz')
        cy.get('#lastName').should('be.visible').type('Gomes Costa').should('have.value', 'Gomes Costa')
        cy.get('#email').should('be.visible').type('beatrizgcx!gmail.com')
        cy.get('#open-text-area').should('be.visible').type('Teste').should('have.value', 'Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //Exercício extra 3

    it('campo de telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
            .type('abcdefj')
            .should('have.value', '')
            //acrescentei para testar
            .type('12345678')
            .should('have.value', '12345678')
    })

    //Exercício extra 4

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').should('be.visible').type('Beatriz').should('have.value', 'Beatriz')
        cy.get('#lastName').should('be.visible').type('Gomes Costa').should('have.value', 'Gomes Costa')
        cy.get('#email').should('be.visible').type('beatrizgcx@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').should('be.visible').type('Teste').should('have.value', 'Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    //Exercício extra 5
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .should('be.visible')
            .type('Beatriz')
            .should('have.value', 'Beatriz')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .should('be.visible')
            .type('Gomes Costa')
            .should('have.value', 'Gomes Costa')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .should('be.visible')
            .type('beatrizgcx@gmail.com')
            .should('have.value', 'beatrizgcx@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .should('be.visible')
            .type(12345678)
            .should('have.value', '12345678')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')
        
    })

    //Exercício extra 6

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Exercício extra 7

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //Exercício extra 8
    //trocar para cy.contains
    //'button[type="submit"]'

    //Aula 4

    //Exercício: Selecionando o produto Youtube por seu texto
    it('Seleciona um produto pelo seu texto (YouTube)', function(){
        cy.get('#product')
         .select('YouTube')
         .should('have.value','youtube')
    })

    //Exercício Extra 1
    it('Seleciona um produto (mentoria) pelo seu valor (value)', function(){
        cy.get('#product')
         .select('mentoria')
         .should('have.value','mentoria')
    })
    
    //Exercício Extra 2
    it('Seleciona um produto (blog) pelo seu valor (indíce)', function(){
        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })

    //Aula 5

    it('Seleciona o tipo de atendimento feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    })

    it('Seleciona os três tipos de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    //Aula 6

    it('Marca todos os checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
            
    })

    //Exercício extra

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário (utilizando o check)', function(){
        cy.get('#firstName').should('be.visible').type('Beatriz').should('have.value', 'Beatriz')
        cy.get('#lastName').should('be.visible').type('Gomes Costa').should('have.value', 'Gomes Costa')
        cy.get('#email').should('be.visible').type('beatrizgcx@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').should('be.visible').type('Teste').should('have.value', 'Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    //Aula 7

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            }) 
    })

    //Exercício extra

    it('Seleciona um arquivo da pasta fixtures simulando drag and drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            }) 
    })

    //Exercício extra 2

    it('Seleciona um arquivo utilizando o alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        }) 
    })

    //Aula 8

    it('Verifica que a política de privacidade abre em outra aba', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //Exercício extra 1

    it('Acessa a página de política de privacidade removendo o target e clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    //Exercício extra 2 : criando o arquivo para acessar diretamente a página de política de privacidade

    

        
})
  