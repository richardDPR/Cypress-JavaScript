describe('Demoblaze tienda - pruebas Cypress', () => {
  const baseUrl = 'https://www.demoblaze.com/index.html'

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('Debería agregar un producto al carrito desde la categoría Phones', () => {
    cy.contains('a', 'Phones').click()
    cy.contains('#tbodyid .card-title a', 'Samsung galaxy s6').click()

    cy.get('.price-container').should('contain.text', '$360')

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('cartAlert')
    })

    cy.contains('a', 'Add to cart').click()
    cy.get('@cartAlert').should('have.been.calledWith', 'Product added')

    cy.contains('Cart').click()
    cy.get('#tbodyid tr').should('contain.text', 'Samsung galaxy s6')
  })

  it('Debería mostrar productos de la categoría Laptops', () => {
    cy.contains('a', 'Laptops').click()

    cy.get('#tbodyid .card').should('have.length.greaterThan', 0)
    cy.get('#tbodyid .card-title').first().should('be.visible')

    cy.get('#tbodyid .card-title').then(($items) => {
      const names = [...$items].map((item) => item.innerText.trim())
      expect(names).to.include('Sony vaio i5')
      expect(names).to.include('Sony vaio i7')
    })
  })

  it('Debería abrir el detalle de producto y validar descripción', () => {
    cy.contains('a', 'Monitors').click()
    cy.contains('#tbodyid .card-title a', 'Apple monitor 24').click()

    cy.get('.name').should('contain.text', 'Apple monitor 24')
    cy.get('.price-container').should('contain.text', '$')
    cy.get('#more-information').should('be.visible').and('not.be.empty')
  })

  it('Debería completar una orden y mostrar confirmación de compra', () => {
    cy.contains('a', 'Phones').click()
    cy.contains('#tbodyid .card-title a', 'Nokia lumia 1520').click()

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('cartAlert')
    })

    cy.contains('a', 'Add to cart').click()
    cy.get('@cartAlert').should('have.been.calledWith', 'Product added')

    cy.contains('Cart').click()
    cy.contains('button', 'Place Order').click()

    cy.get('#name').type('QA Tester')
    cy.get('#country').type('Spain')
    cy.get('#city').type('Madrid')
    cy.get('#card').type('1234 5678 9012 3456')
    cy.get('#month').type('12')
    cy.get('#year').type('2026')
    cy.contains('button', 'Purchase').click()

    cy.get('.sweet-alert').should('be.visible')
    cy.get('.sweet-alert h2').should('contain.text', 'Thank you for your purchase!')
    cy.get('.sweet-alert .lead').should('contain.text', 'Id:')
    cy.contains('button', 'OK').click()
  })

  it('Debería mostrar error en login fallido y tomar screenshot', () => {
    cy.get('#login2').click()

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('loginAlert')
    })

    cy.get('#loginusername').should('be.visible').type('usuario_invalido')
    cy.get('#loginpassword').type('contraseña_invalida')
    cy.contains('button', 'Log in').click()

    cy.get('@loginAlert').should('have.been.calledWithMatch', /User does not exist\.|Wrong password\./)
    cy.screenshot('login-failed')
  })
})
