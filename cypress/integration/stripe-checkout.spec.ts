describe('Stripe checkout', () => {
    it('Visit the Seezona', () => {
      cy.visit('/');

      cy.contains('Diamond Mini Dress In Black').click();
      cy.contains('Select size').click();
      cy.get('.product__select__menu').contains('M').click();
      cy.contains('add to shopping bag').click();
      cy.contains('Go to checkout').click();

      cy.contains('Select country', { timeout: 30000 }).click();
      cy.get('.cart__form--select__menu').contains('China').click();
      cy.get('[placeholder="Email *"]').type('yuliya.revera@seezona.com');
      cy.get('[placeholder="Name *"]').type('Yuliia');
      cy.get('[placeholder="Surname *"]').type('Test');
      cy.get('[placeholder="Address *"]').type('Peremohy avenue');
      cy.get('[placeholder="Postal code *"]').type('03165');
      cy.get('[placeholder="City *"]').type('Kyiv');
      cy.get('[placeholder="Phone number *"]').type('7654468989');
      
      // Filling stripe iframe with data
      cy.get('iframe[title="Secure card payment input frame"]').then(($iframe) => {
        const $body = $iframe.contents().find('body')

        cy.wrap($body)
          .find('input[autocomplete="cc-number"]')
          .type('4242424242424242', { force: true })
        cy.wrap($body)
          .find('input[autocomplete="cc-exp"]')
          .type('03/30', { force: true })
        cy.wrap($body)
          .find('input[autocomplete="cc-csc"]')
          .type('737', { force: true })
    })
     cy.contains('Complete purchase').click();

     cy.contains('WE SENT AN ORDER TO THE FOLLOWING ADDRESS: ', { timeout: 30000 }).should('be.visible');
})
})
